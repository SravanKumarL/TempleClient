import * as actionTypes from '../actions/actionTypes';
import constants, { uniqueProp } from '../sagas/constants';
const initialState = {
    columns: [], rows: [], loading: false, error: '', message: '', change: {}, prevRows: [],
    printReq: false, totalCount: 0
};
export const entity = (name) => (state = initialState, action) => {
    const { payload } = action;
    if (payload && name !== payload.name) return state;
    const fetchState = {
        ...state, rows: mergeRows(state, payload),
        loading: ((payload && payload.loading) || false) || false, error: '', name
    };
    switch (action.type) {
        case actionTypes.onFetchEntityReq:
            return { ...fetchState, printReq: payload.printReq };
        case actionTypes.onFetchEntitySuccess:
            return { ...fetchState, printReq: false, totalCount: payload.totalCount || state.totalCount };
        case actionTypes.onFetchEntitySchemaSuccess:
            return { ...state, columns: action.payload.columns, loading: action.payload.loading, error: '', name, printReq: action.payload.printReq };
        case actionTypes.onFetchEntityFailed:
            return { ...state, rows: [], error: action.payload.error, loading: false, name };
        case actionTypes.onEntityTransactionCommitted:
            return { ...state, message: action.payload.message, error: '', name, rows: changeRows(payload, state.rows, true) };
        case actionTypes.onEntityTransactionCommitReq:
            return { ...state, error: '', message: '', rows: changeRows(payload, state.rows), prevRows: state.rows, name };
        case actionTypes.clearEntityMessages:
            return { ...state, error: '', message: '' };
        case actionTypes.onEntityTransactionFailed:
            return { ...state, error: action.payload.error, message: '', name, rows: state.prevRows };/* ,transaction:action.payload.transaction */
        case actionTypes.resetEntity:
            return initialState;
        default:
            return state;
    }
};
const mergeRows = (state, payload) => {
    if (!payload || !payload.rows)
        return state.rows;
    const primaryKey = uniqueProp(payload.name);
    const prevRowKeys = state.rows.map(row => row[primaryKey]);
    const newRows = payload.rows.filter(row => prevRowKeys.indexOf(row[primaryKey]) === -1);
    return [...state.rows, ...newRows];
}
const changeRows = (payload, rows, commitSucessful = false) => {
    const { type, change, name } = payload;
    if (!change) return rows;
    const prop = uniqueProp(name);
    switch (type) {
        case constants.add:
            if (commitSucessful){
                return [...rows.filter(row => !row.toChange), { ...change }];
            }
            else{
                return [...rows, { ...change, toChange: true }]
            }
        case constants.edit:
            return rows.map(row => (row[prop] === change[prop] ? change : row));
        case constants.delete:
            const uniquePropVal = change[prop];
            return rows.filter(row => row[prop] !== uniquePropVal);
        default:
            return rows;
    }
}