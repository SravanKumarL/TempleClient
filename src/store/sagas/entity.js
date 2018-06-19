import axios from '../../axios/poojas';
import { put } from 'redux-saga/effects'
import * as actions from '../actions/entity';
import * as transactionSagas from './transactions';
import constants, { reportMapping, uniqueProp } from './constants';
export function* handleTransaction(action) {
    const { type, collection, change, changedObj } = action.payload;
    if (collection === constants.Transactions && type === constants.add) {
        yield* transactionSagas.addTransactionSaga(action);
    }
    else {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error(`You are not allowed to ${type} ${collection}`);
            }
            else {
                const headers = {
                    'authorization': `${token}`,
                }
                let response = {};
                const resultantChange = changedObj ? { ...changedObj, ...change } : change;
                yield put(actions.onTransactionCommitReq(type, resultantChange, collection));
                switch (type) {
                    case constants.add:
                        response = yield axios({
                            method: 'post',
                            url: `/${collection}/add`,
                            data: JSON.stringify(change),
                            headers
                        });
                        yield handleResponse(response, collection, constants.edit);
                        break;
                    case constants.delete:
                        const reqParam = change[uniqueProp(collection)];
                        response = yield axios({
                            method: 'delete',
                            url: `/${collection}/${reqParam}`,
                            headers
                        });
                        yield handleResponse(response, collection, type);
                        break;
                    case constants.edit:
                        response = yield axios({
                            method: 'put',
                            url: `/${collection}/${changedObj[uniqueProp(collection)]}`,
                            data: JSON.stringify(change),
                            headers
                        });
                        yield handleResponse(response, collection, type, changedObj);
                        break;
                    default:
                        break;
                }
            }
        }
        catch (error) {
            console.log(error);
            yield put(actions.onTransactionFailed(error.message, collection))
        }
    }
}
const handleResponse = function* (response, collection, type, changedObj) {
    const { error, message, change } = response.data;
    if (error)
        yield put(actions.onTransactionFailed(error, collection));
    else
        yield put(actions.onTransactionCommitted(message, (changedObj ? { ...changedObj, ...change } : change), type, collection));
}
export function* handleFetchData(action) {
    const { collection, searchCriteria, refetch } = action.payload;
    const { pagingOptions, printReq } = action.payload;
    let count, pageSize = undefined;
    if (pagingOptions) {
        count = pagingOptions.count;
        pageSize = pagingOptions.pageSize;
    }
    if (collection === constants.Transactions) {
        yield* transactionSagas.getTransactionsSaga(action);
    }
    else {
        try {
            yield put(actions.onFetchReq(collection, refetch));
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error(`You are not allowed to ${constants.get} the ${collection}`);
            } else {
                const headers = {
                    'authorization': `${token}`,
                }
                let response = {};
                if (searchCriteria && collection === constants.Reports) {
                    response = yield axios({
                        method: 'post',
                        data: { ...searchCriteria, pageSize, count },
                        url: `/${collection}`,
                        headers
                    });
                }
                else {
                    response = yield axios({
                        method: 'get',
                        url: `/${collection}?pageSize=${pageSize}&count=${count}`,
                        headers
                    });
                }
                yield put(actions.onFetchSuccess(response.data, collection, printReq));
            }
        } catch (error) {
            console.log(error);
            yield put(actions.onFetchFailed(error.message, collection));
        }
    }
}
export function* handleFetchSchema(action) {
    const { collection, searchCriteria } = action.payload;
    try {
        yield put(actions.onFetchReq(collection));
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error(`You are not allowed to ${constants.get} ${constants.Schema} of the ${collection}`);
        } else {
            if (searchCriteria && collection === constants.Reports) {
                yield put(actions.onFetchSchemaSuccess(reportMapping[searchCriteria.ReportName], collection));
            }
            else {
                const headers = {
                    'authorization': `${token}`,
                }
                const response = yield axios({
                    method: 'get',
                    url: `/${collection}/${constants.Schema}`,
                    headers
                });
                yield put(actions.onFetchSchemaSuccess(response.data, collection));
            }
        }
    } catch (error) {
        console.log(error);
        yield put(actions.onFetchFailed(error.message, collection));
    }
}