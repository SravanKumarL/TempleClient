import * as actionTypes from '../actions/actionTypes';
const initialState = { columns: [], rows: [], loading: false, error: '', message: '' };
export default function entity(state = initialState, action) {
    switch (action.type) {
        case actionTypes.onFetchReq:
        case actionTypes.onFetchSuccess:
            return { ...state, rows: action.payload.rows, loading: action.payload.loading, error: '' };
        case actionTypes.onFetchSchemaSuccess:
            return { ...state, columns: action.payload.columns, loading: action.payload.loading, error: '' };
        case actionTypes.onFetchFailed:
            return { ...state, rows: [], error: action.payload.error, loading: false };
        case actionTypes.onTransactionCommitted:
            return { ...state, message: action.payload.message, error: '' }
        case actionTypes.onTransactionCommitReq:
            return { ...state, error: '', message: '' }
        case actionTypes.onTransactionFailed:
            return { ...state, error: action.payload.error, message: '' };/* ,transaction:action.payload.transaction */
        case actionTypes.resetEntity:
            return initialState;
        default:
            return state;
    }
}