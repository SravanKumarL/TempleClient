import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../client/shared/utility';

const initialState = {
  message: null,
  error: null,
  transactions: null,
  searchedTransactions: null,
  loading: false,
}
export const addTransactionSuccess = (state, action) => {
  return updateObject(state, { message: action.message });
}
export const addTransactionFail = (state, action) => {
  return updateObject(state, { error: action.error });
}
export const getTransactionsSuccess = (state, action) => {
  return updateObject(state, { transactions: action.transactions });
}
export const getTransactionsFail = (state, action) => {
  return updateObject(state, { error: action.error });
}
export const searchTransactionsStart = (state, action) => {
  return updateObject(state, { loading: true });
}
export const searchTransactionsSuccess = (state, action) => {
  return updateObject(state, { searchedTransactions: action.transactions, loading: false });
}
export const searchTransactionsFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRANSACTION_SUCCESS:
      return addTransactionSuccess(state, action);
    case actionTypes.ADD_TRANSACTION_FAIL:
      return addTransactionFail(state, action);
    case actionTypes.GET_TRANSACTIONS_SUCCESS:
      return getTransactionsSuccess(state, action);
    case actionTypes.GET_TRANSACTIONS_FAIL:
      return getTransactionsFail(state, action);
    case actionTypes.SEARCH_TRANSACTIONS_START:
      return searchTransactionsStart(state, action);
    case actionTypes.SEARCH_TRANSACTIONS_SUCCESS:
      return searchTransactionsSuccess(state, action);
    case actionTypes.SEARCH_TRANSACTIONS_FAIL:
      return searchTransactionsFail(state, action);
    default:
      return state;
  }
};

export default reducer;