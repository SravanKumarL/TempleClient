import * as actionTypes from '../actions/actionTypes';
import constants, { uniqueProp } from '../sagas/constants';
const initialState = { columns: [], rows: [], loading: false, error: '', message: '', change: {}, prevRows: [] };
export const entity = (name) => (state = initialState, action) => {
    const { payload } = action;
    if (payload && name !== payload.name) return state;
    switch (action.type) {
        case actionTypes.onFetchReq:
        case actionTypes.onFetchSuccess:
            return { ...state, rows: action.payload.rows, loading: action.payload.loading, error: '', name };
        case actionTypes.onFetchSchemaSuccess:
            return { ...state, columns: action.payload.columns, loading: action.payload.loading, error: '', name };
        case actionTypes.onFetchFailed:
            return { ...state, rows: [], error: action.payload.error, loading: false, name };
        case actionTypes.onTransactionCommitted:
            return { ...state, message: action.payload.message, error: '', name };
        case actionTypes.onTransactionCommitReq:
            const { type, change, name } = payload;
            return { ...state, error: '', message: '', rows: changeRows(type, state.rows, change, name), prevRows: state.rows };
        case actionTypes.onTransactionFailed:
            return { ...state, error: action.payload.error, message: '', name, rows: state.prevRows };/* ,transaction:action.payload.transaction */
        case actionTypes.resetEntity:
            return initialState;
        default:
            return state;
    }
};
const changeRows = (type, rows, change, name) => {
    const prop = uniqueProp(name);
    switch (type) {
        case constants.add:
            return [...rows, change];
        case constants.edit:
            return rows.map(row => row[prop] === action.payload.change[prop] ? action.payload.change : row);
        case constants.delete:
            const uniquePropVal=change[prop];
            return rows.filter(row[prop] !== uniquePropVal);
    }
}