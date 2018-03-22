import axios from '../../axios/poojas';
import { put,call } from 'redux-saga/effects'
import * as actions from '../actions';
import * as transactionSagas from './transactions';
import constants from './constants';
import { delay } from 'redux-saga';
export function* handleTransaction(action) {
    const { rows, type, collection, change } = action.payload;
    if (collection === constants.Transactions && type === constants.add) {
        yield* transactionSagas.addTransactionSaga(action);
    }
    else {
        yield put(actions.onTransactionCommitReq());
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error(`You are not allowed to ${type} ${collection}`);
            }
            else {
                const headers = {
                    'authorization': `${token}`,
                }
                let response={};
                switch (type) {
                    case constants.addTransaction:
                        response = yield axios({
                            method: 'post',
                            url: `/${collection}/add`,
                            data: JSON.stringify(change),
                            headers
                        });
                        yield call(handleResponse,response,rows);
                        break;
                    case constants.deleteTransaction:
                        response = yield axios({
                            method: 'delete',
                            url: `/${collection}/${change}`,
                            headers
                        });
                        yield call(handleResponse,response,rows);
                        break;
                    case constants.editTransaction:
                        const entity = Object.getOwnPropertyNames(change)[0];
                        response = yield axios({
                            method: 'put',
                            url: `/${collection}/${entity}`,
                            data: JSON.stringify(Object.values(change)[0]),
                            headers
                        }).then()
                        yield call(handleResponse,response,rows);
                        break;
                    default:
                        break;
                }
            }
        }
        catch (err) {
            yield put(actions.onTransactionFailed(err.message))
        }
    }
}
function handleResponse(response,rows) {
    const { error, message } = response.data;
    if (error)
        yield put(actions.onTransactionFailed(error));
    else
        yield put(actions.onTransactionCommitted(rows, message));
}
export function* handleFetchData(action) {
    const { collection } = action.payload;
    if (collection === constants.Transactions) {
        yield* transactionSagas.getTransactionsSaga(action);
    }
    else {
        try {
            yield put(actions.onFetchReq());
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error(`You are not allowed to ${constants.get} the ${collection}`);
            } else {
                const headers = {
                    'authorization': `${token}`,
                }
                const response = yield axios({
                    method: 'get',
                    url: `/${collection}`,
                    headers
                });
                yield put(actions.onFetchSuccess(response.data));
            }
        } catch (error) {
            yield put(actions.onFetchFailed(error));
        }
    }
}
export function* handleFetchSchema(action) {
    const { collection } = action.payload;
    try {
        yield put(actions.onFetchReq());
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error(`You are not allowed to ${constants.get} ${constants.Schema} of the ${collection}`);
        } else {
            const headers = {
                'authorization': `${token}`,
            }
            const response = yield axios({
                method: 'get',
                url: `/${collection}/${constants.Schema}`,
                headers
            });
            console.log(response.data);
            yield put(actions.onFetchSchemaSuccess(response.data));
        }
    } catch (error) {
        yield put(actions.onFetchFailed(error));
    }
}