import * as actionTypes from './actionTypes';
export const commitTransaction = (type, collection, change, changedObj) => {
    return { type: actionTypes.commitTransaction, payload: { type, change, changedObj, collection, name: collection } }
}
export const fetchData = (collection, searchCriteria) => {
    return { type: actionTypes.fetchData, payload: { collection, searchCriteria, name: collection } };
}
export const fetchSchema = (collection, searchCriteria) => {
    return { type: actionTypes.fetchSchema, payload: { collection, searchCriteria, name: collection } };
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
export const onTransactionCommitted = (message, change, type, name) => {
    return { type: actionTypes.onTransactionCommitted, payload: { message, type, change, name } };
}
export const onTransactionCommitReq = (type, change, name) => {
    return { type: actionTypes.onTransactionCommitReq, payload: { type, change, name } };
}