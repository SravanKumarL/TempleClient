import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { signInSaga, autoSigninSaga } from './auth';
import { addTransactionSaga, getTransactionsSaga, searchTransactionsSaga } from './transactions';
import { addPoojaSaga, getPoojaDetailsSaga } from './poojas';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTHENTICATE, signInSaga);
  yield takeEvery(actionTypes.AUTH_AUTO_SIGNIN, autoSigninSaga);
  yield takeEvery(actionTypes.ADD_TRANSACTION, addTransactionSaga);
  yield takeEvery(actionTypes.GET_TRANSACTIONS, getTransactionsSaga);
  yield takeEvery(actionTypes.SEARCH_TRANSACTIONS, searchTransactionsSaga);
  yield takeEvery(actionTypes.ADD_POOJA, addPoojaSaga);
  yield takeEvery(actionTypes.GET_POOJADETAILS, getPoojaDetailsSaga);
}
