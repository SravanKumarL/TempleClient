import axios from '../../axios/poojas';
import { put, call } from 'redux-saga/effects'
import * as actions from '../actions/entity';
import * as transactionSagas from './transactions';
import constants, { reportMapping } from './constants';
export function* handleTransaction(action) {
    const { type, collection, change } = action.payload;
    if (collection === constants.Transactions && type === constants.add) {
        yield* transactionSagas.addTransactionSaga(action);
    }
    else {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error(`You are not allowed to ${type} ${collection}`);
            }
            else {
                const headers = {
                    'authorization': `${token}`,
                }
                let response = {};
                switch (type) {
                    case constants.add:
                        response = yield axios({
                            method: 'post',
                            url: `/${collection}/add`,
                            data: JSON.stringify(change),
                            headers
                        });
                        yield handleResponse(response, collection);
                        break;
                    case constants.delete:
                        response = yield axios({
                            method: 'delete',
                            url: `/${collection}/${change}`,
                            headers
                        });
                        yield handleResponse(response, collection);
                        break;
                    case constants.edit:
                        const entity = Object.getOwnPropertyNames(change)[0];
                        const { changedObj } = action.payload;
                        response = yield axios({
                            method: 'put',
                            url: `/${collection}/${entity}`,
                            data: JSON.stringify(Object.values(change)[0]),
                            headers
                        });
                        yield handleResponse(response, collection, changedObj);
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
const handleResponse = function* (response, collection, changedObj) {
    const { error, message, change } = response.data;
    if (error)
        yield put(actions.onTransactionFailed(error, collection));
    else
        yield put(actions.onTransactionCommitted(message, collection, Object.assign(changedObj, change)));
}
export function* handleFetchData(action) {
    const { collection, searchCriteria } = action.payload;
    if (collection === constants.Transactions) {
        yield* transactionSagas.getTransactionsSaga(action);
    }
    else {
        try {
            yield put(actions.onFetchReq(collection));
            const token = localStorage.getItem('token');
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
                        data: searchCriteria,
                        url: `/${collection}`,
                        headers
                    });
                }
                else {
                    response = yield axios({
                        method: 'get',
                        url: `/${collection}`,
                        headers
                    });
                }
                yield put(actions.onFetchSuccess(response.data, collection));
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
        const token = localStorage.getItem('token');
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