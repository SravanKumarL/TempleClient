import * as actionTypes from './actionTypes';
export const commitTransaction = (type, collection, change, changedObj) => {
    return { type: actionTypes.commitTransaction, payload: { type, change, changedObj, collection, name: collection } }
}
export const fetchData = (collection, searchCriteria, pagingOptions, refetch = false, isPrintReq = false, fetchCount = false) => {
    return { type: actionTypes.fetchData, payload: { collection, searchCriteria, pagingOptions, refetch, isPrintReq, name: collection, fetchCount } };
}
export const fetchSchema = (collection, searchCriteria) => {
    return { type: actionTypes.fetchSchema, payload: { collection, searchCriteria, name: collection } };
}
export const onFetchReq = (name, refetch = false, printReq = false) => {
    return { type: actionTypes.onFetchReq, payload: { loading: !refetch, rows: [], name, printReq } };
}
export const onFetchSuccess = (responseData, name) => {
    return { type: actionTypes.onFetchSuccess, payload: { loading: false, rows: responseData.rows, name, totalCount: responseData.totalCount } };
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
export const clearMessages = (name) => {
    return { type: actionTypes.clearMessages, payload: { name } };
}
export const resetEntity = (name) => {
    return { type: actionTypes.resetEntity, payload: { name } };
}