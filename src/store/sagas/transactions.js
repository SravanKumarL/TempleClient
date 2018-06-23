import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from '../actions';
import axios from '../../axios/transactions';
import constants from './constants';
export function* addTransactionSaga(action) {
  try {
    yield put(actions.addTransactionStarted());
    const token = sessionStorage.getItem('token');
    if (!token) {
      const error = { message: 'You are not allowed to do the transaction' };
      yield put(actions.addTransactionFail(error));
    } else {
      const headers = {
        'authorization': `${token}`,
      }
      const response = yield axios({
        method: 'post',
        url: `${constants.Transactions}/${constants.add}`,
        data: action.payload.change,
        headers
      });
      yield put(actions.addTransactionSuccess(response.data.message));
    }

  } catch (error) {
    yield put(actions.addTransactionFail(error));
  }

}

export function* getTransactionsSaga() {
  try {
    yield put(actions.getTransactionsStarted());
    const token = sessionStorage.getItem('token');
    if (!token) {
      const error = { message: 'You are not allowed to do the transaction' };
      yield put(actions.getTransactionsFail(error));
    } else {
      const headers = {
        'authorization': `${token}`,
      }
      const response = yield axios({
        method: 'get',
        url: `${constants.Transactions}`,
        headers
      });
      yield put(actions.getTransactionsSuccess(response.data.transactions));
    }
  } catch (error) {
    yield put(actions.getTransactionsFail(error));
  }
}

export function* searchTransactionsSaga(action) {
  try {
    yield delay(500);
    yield put(actions.searchTransactionsStarted());
    const { searchData, fetchCount, refetch } = action;
    const token = sessionStorage.getItem('token');
    if (!token) {
      const error = { message: 'You are not allowed to do the transaction' };
      yield put(actions.searchTransactionsFail(error));
    } else {
      const headers = {
        'authorization': `${token}`,
      }
      const response = yield axios({
        method: 'post',
        url: `${constants.Transactions}?fetchCount=${fetchCount}`,
        headers,
        data: searchData
      });
      yield put(actions.searchTransactionsSuccess(response.data, refetch));
    }
  } catch (error) {
    yield put(actions.searchTransactionsFail(error));
  }
}