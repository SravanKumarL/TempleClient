import * as actionTypes from './actionTypes';
export const commitEntityTransaction = (type, collection, change, changedObj) => {
    return { type: actionTypes.commitEntityTransaction, payload: { type, change, changedObj, collection, name: collection } }
}
export const fetchEntityData = (collection, searchCriteria, pagingOptions, refetch = false, isPrintReq = false) => {
    return {
        type: actionTypes.fetchEntityData, payload: {
            collection, searchCriteria, pagingOptions,
            refetch, isPrintReq, name: collection
        }
    };
}
export const fetchEntitySchema = (collection, searchCriteria) => {
    return { type: actionTypes.fetchEntitySchema, payload: { collection, searchCriteria, name: collection } };
}
export const fetchTotal = (collection, searchCriteria) => {
    return { type: actionTypes.fetchTotal, payload: { collection, searchCriteria } };
}
export const onFetchEntityReq = (name, refetch = false, printReq = false) => {
    return { type: actionTypes.onFetchEntityReq, payload: { loading: !refetch, rows: [], name, printReq } };
}
export const onFetchEntitySuccess = (responseData, name, countFetched = false, fetchOthers = false) => {
    return {
        type: actionTypes.onFetchEntitySuccess, payload: {
            loading: false, rows: responseData.rows, name,
            [fetchOthers ? 'othersTotalCount' : 'totalCount']: responseData.totalCount,
            countFetched
        }
    };
}
export const onFetchTotalSuccess = (responseData, name) => {
    return {
        type: actionTypes.onFetchTotalSuccess, payload: {
            name, totalAmount: responseData.totalAmount,
        }
    };
}
export const onFetchTotalFailure = (responseData, name) => {
    return {
        type: actionTypes.onFetchTotalFailure, payload: { error: responseData.error, name }
    };
}
export const onFetchEntitySchemaSuccess = (columns, name) => {
    return { type: actionTypes.onFetchEntitySchemaSuccess, payload: { loading: false, columns, name } };
}
export const onFetchEntityFailed = (error, name) => {
    return { type: actionTypes.onFetchEntityFailed, payload: { error, name } };
}
export const onEntityTransactionFailed = (error, name) => {
    return { type: actionTypes.onEntityTransactionFailed, payload: { error, name } };
}
export const onEntityTransactionCommitted = (message, change, type, name) => {
    return { type: actionTypes.onEntityTransactionCommitted, payload: { message, type, change, name } };
}
export const onEntityTransactionCommitReq = (type, change, name) => {
    return { type: actionTypes.onEntityTransactionCommitReq, payload: { type, change, name } };
}
export const clearEntityMessages = (name) => {
    return { type: actionTypes.clearEntityMessages, payload: { name } };
}
export const resetEntity = (name) => {
    return { type: actionTypes.resetEntity, payload: { name } };
}