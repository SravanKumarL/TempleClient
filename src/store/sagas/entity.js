import axios from '../../axios/poojas';
import { delay } from 'redux-saga';
import { delay } from 'redux-saga';
import { all, takeEvery, takeLatest, throttle, put, call } from 'redux-saga/effects'
import * as actionTypes from '../actions/actiontypes';
import * as actions from '../actions';
import { dispatch } from 'redux';
import * as transactionSagas from './transactions';
import constants from './constants';
function* handleTransaction(action) {
    const { rows, type, collection, change } = action.payload;
    if (collection === constants.Transactions && type==constants.add) {
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
                switch (type) {
                    case constants.addTransaction:
                        const response = yield axios({
                            method: 'post',
                            url: `/${collection}/add`,
                            data: JSON.stringify(change),
                            headers
                        });
                        yield put(actions.onTransactionCommitted(rows, response.data.message));
                        break;
                    case constants.deleteTransaction:
                        const response = yield axios({
                            method: 'delete',
                            url: `/${collection}/${change}`,
                            headers
                        });
                        yield put(actions.onTransactionCommitted(rows, response.data.message));
                        break;
                    case constants.editTransaction:
                        const entity=Object.getOwnPropertyNames(change)[0];
                        const response = yield axios({
                            method: 'put',
                            url: `/${collection}/${entity}`,
                            data: JSON.stringify(Object.values(change)[0]),
                            headers
                        });
                        yield put(actions.onTransactionCommitted(rows, response.data.message));
                        break;
                }
            }
        }
        catch (err) {
            yield put(actions.onTransactionFailed(err.message))
        }
    }
}
function* handleFetch(action) {
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
function* watchFetchReq() {
    yield takeEvery(actionTypes.fetchData, handleFetch);
}
function* watchTransactions() {
    yield takeEvery(actionTypes.commitTransaction, handleTransaction);
}
export default function* EntitySaga() {
    yield all([watchFetchReq(), watchTransactions()]);
}