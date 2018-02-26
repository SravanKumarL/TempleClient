import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios/transactions';

export function* addTransactionSaga(action) {
  try {
    yield put(actions.addTransactionStarted());
    const token = localStorage.getItem('token');
    if (!token) {
      const error = { message: 'You are not allowed to do the transaction' };
      yield put(actions.addTransactionFail(error));
    } else {
      const headers = {
        'authorization': `${token}`,
      }
      const response = yield axios({
        method: 'post',
        url: '/addTransaction',
        data: action.transaction,
        headers
      });
      yield put(actions.addTransactionSuccess(response.data.message));
    }

  } catch (error) {
    yield put(actions.addTransactionFail(error));
  }

}

export function* getTransactionsSaga(action) {
  try {
    yield put(actions.getTransactionsStarted());
    const token = localStorage.getItem('token');
    if (!token) {
      const error = { message: 'You are not allowed to do the transaction' };
      yield put(actions.getTransactionsFail(error));
    } else {
      const headers = {
        'authorization': `${token}`,
      }
      const response = yield axios({
        method: 'get',
        url: '/getTransactions',
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
    yield put(actions.searchTransactionsStarted());
    const searchData = action.searchData;
    const token = localStorage.getItem('token');
    if (!token) {
      const error = { message: 'You are not allowed to do the transaction' };
      yield put(actions.searchTransactionsFail(error));
    } else {
      const headers = {
        'authorization': `${token}`,
      }
      const response = yield axios({
        method: 'post',
        url: '/getTransactionsWithPhoneNumber',
        headers,
        data: searchData
      });
      yield put(actions.searchTransactionsSuccess(response.data.transactions));
    }
  } catch (error) {
    yield put(actions.getTransactionsFail(error));
  }
}