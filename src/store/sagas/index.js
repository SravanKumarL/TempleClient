import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { signInSaga, autoSigninSaga } from './auth';
import { searchTransactionsSaga } from './transactions';
import {handleFetchData,handleFetchSchema,handleTransaction} from './entity';
export function* watchAuth() {
  yield takeEvery(actionTypes.AUTHENTICATE, signInSaga);
  yield takeEvery(actionTypes.AUTH_AUTO_SIGNIN, autoSigninSaga);
  yield takeEvery(actionTypes.SEARCH_TRANSACTIONS, searchTransactionsSaga);
  yield takeEvery(actionTypes.fetchEntityData, handleFetchData);
  yield takeEvery(actionTypes.fetchEntitySchema, handleFetchSchema);
  yield takeEvery(actionTypes.commitEntityTransaction, handleTransaction);
}
