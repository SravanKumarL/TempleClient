import * as actionTypes from '../actions/actionTypes';
import constants from '../sagas/constants';
const initialState = { columns: [], rows: [], loading: false, error: '', message: '', change: {} };
const uniqueProp = collection => collection === constants.Users ? 'username' : 'id';
export const entity = (name) => (state = { name, columns: [], rows: [], loading: false, error: '', message: '' }, action) => {
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
            const prop = uniqueProp(name);
            const rows = state.rows.map(row => row[prop] === action.payload.change[prop] ? action.payload.change : row);
            return { ...state, message: action.payload.message, error: '', name, rows }
        case actionTypes.onTransactionCommitReq:
            return { ...state, error: '', message: '', name }
        case actionTypes.onTransactionFailed:
            return { ...state, error: action.payload.error, message: '', name };/* ,transaction:action.payload.transaction */
        case actionTypes.resetEntity:
            return initialState;
        default:
            return state;
    }
};