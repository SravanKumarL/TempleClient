import * as actionTypes from '../actions/actionTypes';
import constants, { uniqueProp } from '../sagas/constants';
const initialState = { columns: [], rows: [], loading: false, error: '', message: '', change: {}, prevRows: [], pageRefreshed: false };
export const entity = (name) => (state = initialState, action) => {
    const { payload } = action;
    if (payload && name !== payload.name) return state;
    switch (action.type) {
        case actionTypes.onFetchReq:
        case actionTypes.onFetchSuccess:
            return {
                ...state, rows: action.payload.rows, loading: action.payload.loading, error: '', name,
                pageRefreshed: action.payload.pageRefreshed
            };
        case actionTypes.onFetchSchemaSuccess:
            return { ...state, columns: action.payload.columns, loading: action.payload.loading, error: '', name };
        case actionTypes.onFetchFailed:
            return { ...state, rows: [], error: action.payload.error, loading: false, name };
        case actionTypes.onTransactionCommitted:
            return { ...state, message: action.payload.message, error: '', name, rows: changeRows(payload, state.rows) };
        case actionTypes.onTransactionCommitReq:
            return { ...state, error: '', message: '', rows: changeRows(payload, state.rows), prevRows: state.rows, name };
        case actionTypes.clearMessages:
            return { ...state, error: '', message: '' };
        case actionTypes.onTransactionFailed:
            return { ...state, error: action.payload.error, message: '', name, rows: state.prevRows };/* ,transaction:action.payload.transaction */
        case actionTypes.onPagePopulated:
            return { ...state, name, pageRefreshed: false };
        case actionTypes.resetEntity:
            return initialState;
        default:
            return state;
    }
};
const changeRows = (payload, rows) => {
    const { type, change, name } = payload;
    if (!change) return rows;
    const prop = uniqueProp(name);
    switch (type) {
        case constants.add:
            return [...rows, { ...change, id: (rows.length + 1) }];
        case constants.edit:
            return rows.map(row => (row[prop] === change[prop] ? change : row));
        case constants.delete:
            const uniquePropVal = change[prop];
            return rows.filter(row => row[prop] !== uniquePropVal);
        default:
            return rows;
    }
}