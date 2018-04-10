import * as actionTypes from './actionTypes';
export const commitTransaction = (type, collection, change, name) => {
    return { type: actionTypes.commitTransaction, payload: { type, change, collection, name } }
}
export const fetchData = (collection, searchCriteria, name) => {
    return { type: actionTypes.fetchData, payload: { collection, searchCriteria, name } };
}
export const fetchSchema = (collection, searchCriteria, name) => {
    return { type: actionTypes.fetchSchema, payload: { collection, searchCriteria, name } };
}
export const onFetchReq = (name) => {
    return { type: actionTypes.onFetchReq, payload: { loading: true, rows: [], name } };
}
export const onFetchSuccess = (rows, name) => {
    return { type: actionTypes.onFetchSuccess, payload: { loading: false, rows, name } };
}
export const onFetchSchemaSuccess = (columns, name) => {
    return { type: actionTypes.onFetchSchemaSuccess, payload: { loading: false, columns, name } };
}
export const onFetchFailed = (error, name) => {
    return { type: actionTypes.onFetchFailed, payload: { error, name } };
}
export const onTransactionFailed = (error, name) => {
    return { type: actionTypes.onTransactionFailed, payload: { error, name } };
}
export const onTransactionCommitted = (message, name) => {
    return { type: actionTypes.onTransactionCommitted, payload: { message }, name };
}
export const onTransactionCommitReq = (name) => {
    return { type: actionTypes.onTransactionCommitReq, payload: { name } };
}