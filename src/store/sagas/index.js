import { takeEvery,takeLatest,all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { signInSaga, autoSigninSaga } from './auth';
import { addTransactionSaga, getTransactionsSaga, searchTransactionsSaga } from './transactions';
import EntitySaga from './entity';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTHENTICATE, signInSaga);
  yield takeEvery(actionTypes.AUTH_AUTO_SIGNIN, autoSigninSaga);
  yield takeEvery(actionTypes.SEARCH_TRANSACTIONS, searchTransactionsSaga);
  yield all(EntitySaga());
}
