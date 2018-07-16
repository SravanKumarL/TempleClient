import * as actionTypes from '../actions/actionTypes';
import constants, { uniqueProp } from '../sagas/constants';
const initialState = {
    columns: [], rows: [], loading: false, error: '', message: '', change: {}, prevRows: [],
    printReq: false, totalCount: 0, othersTotalCount: 0, totalAmount: {}, countFetched: false, othersFetched: false,
    unAlteredRows: []
};
export const entity = (name) => (state = initialState, action) => {
    const { payload } = action;
    if (payload && name !== payload.name) return state;
    let unAlteredRows = mergeRows(state, payload);
    const fetchState = {
        ...state, rows: unAlteredRows.filter(row => row !== 0),
        loading: ((payload && payload.loading) || false) || false, error: '', name
    };
    switch (action.type) {
        case actionTypes.onFetchEntityReq:
            return { ...fetchState };
        case actionTypes.onFetchEntitySuccess:
            return {
                ...fetchState, printReq: payload.printReq || state.printReq, totalCount: payload.totalCount || state.totalCount,
                othersTotalCount: payload.othersTotalCount || state.othersTotalCount,
                countFetched: payload.countFetched || state.countFetched,
                othersFetched: payload.othersFetched || state.othersFetched, unAlteredRows,
            };
        case actionTypes.onFetchTotalSuccess:
            return { ...fetchState, totalAmount: payload.totalAmount || state.totalAmount };
        case actionTypes.onFetchTotalFailure:
            return { ...fetchState, totalAmount: {}, error: action.payload.error };
        case actionTypes.onFetchEntitySchemaSuccess:
            return { ...state, columns: action.payload.columns, loading: action.payload.loading, error: '', name, printReq: action.payload.printReq };
        case actionTypes.onFetchEntityFailed:
            return { ...state, rows: state.rows, error: action.payload.error, loading: false, name };
        case actionTypes.onEntityTransactionCommitted:
            unAlteredRows = changeRows(payload, unAlteredRows, true);
            return {
                ...state, message: action.payload.message, error: '', name, rows: unAlteredRows.filter(row => row !== 0),
                unAlteredRows
            };
        case actionTypes.onEntityTransactionCommitReq:
            unAlteredRows = changeRows(payload, unAlteredRows);
            return {
                ...state, error: '', message: '', rows: unAlteredRows.filter(row => row !== 0), prevRows: state.rows, name,
                unAlteredRows
            };
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
    else if (payload.printReq)
        return payload.rows;
    else {
        let rows = state.unAlteredRows;
        if (rows.length === 0 && payload.totalCount)
            rows = new Array(payload.totalCount).fill(0);
        const skip = payload.pagingOptions.skip || state.rows.length;
        const primaryKey = uniqueProp(payload.name);
        if (!(state.rows.every(row => primaryKey in row) && payload.rows.every(row => primaryKey in row))) {
            // return [...state.rows, ...payload.rows];
            if (payload.rows.length > 0) {
                rows.splice(skip, payload.rows.length, ...payload.rows);
            }
            return rows;
        }
        const prevRowKeys = state.rows.map(row => row[primaryKey]);
        const newRows = payload.rows.filter(row => prevRowKeys.indexOf(row[primaryKey]) === -1);
        // return [...state.rows, ...newRows];
        if (newRows.length > 0) {
            rows.splice(skip, newRows.length, ...newRows);
        }
        return rows
    }
}
const changeRows = (payload, rows, commitSucessful = false) => {
    const { type, change, name } = payload;
    if (!change) return rows;
    const prop = uniqueProp(name);
    switch (type) {
        case constants.add:
            if (commitSucessful) {
                return [...rows.filter(row => row === 0 || !row.toChange), { ...change }];
            }
            else {
                return [...rows, { ...change, toChange: true }]
            }
        case constants.edit:
            return rows.map(row => row === 0 ? row : (row[prop] === change[prop] ? change : row));
        case constants.delete:
            const uniquePropVal = change[prop];
            return rows.filter(row => row === 0 || row[prop] !== uniquePropVal);
        default:
            return rows;
    }
}
export const defaultInitialState = initialState;