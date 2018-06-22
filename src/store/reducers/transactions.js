import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../client/shared/utility';

const initialState = {
  message: null,
  error: null,
  transactions: null,
  searchedTransactions: [],
  loading: false,
  totalCount: 0
}

export const addTransactionStarted = (state, action) => {
  return updateObject(state, { loading: true });
}
export const addTransactionSuccess = (state, action) => {
  return updateObject(state, { message: action.message, loading: false });
}
export const addTransactionFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
}

export const getTransactionStarted = (state, action) => {
  return updateObject(state, { loading: true });
}
export const getTransactionsSuccess = (state, action) => {
  return updateObject(state, { transactions: action.transactions, loading: false });
}
export const getTransactionsFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
}

export const searchTransactionsStarted = (state, action) => {
  return updateObject(state, { loading: true });
}
export const searchTransactionsSuccess = (state, action) => {
  return updateObject(state, {
    searchedTransactions: [...state.searchedTransactions, ...action.transactions], loading: false,
    totalCount: action.totalCount || state.totalCount
  });
}
export const searchTransactionsFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
}
export const onTransactionFailed = (state, action) => {
  return updateObject(state, { error: action.payload.error });
}
export const onTransactionCommitted = (state, action) => {
  return updateObject(state, { message: action.payload.message });
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRANSACTION_START:
      return addTransactionStarted(state, action);
    case actionTypes.ADD_TRANSACTION_SUCCESS:
      return addTransactionSuccess(state, action);
    case actionTypes.ADD_TRANSACTION_FAIL:
      return addTransactionFail(state, action);

    case actionTypes.GET_TRANSACTIONS_START:
      return getTransactionStarted(state, action);
    case actionTypes.GET_TRANSACTIONS_SUCCESS:
      return getTransactionsSuccess(state, action);
    case actionTypes.GET_TRANSACTIONS_FAIL:
      return getTransactionsFail(state, action);

    case actionTypes.SEARCH_TRANSACTIONS_START:
      return searchTransactionsStarted(state, action);
    case actionTypes.SEARCH_TRANSACTIONS_SUCCESS:
      return searchTransactionsSuccess(state, action);
    case actionTypes.SEARCH_TRANSACTIONS_FAIL:
      return searchTransactionsFail(state, action);

    case actionTypes.onTransactionCommitted:
      return onTransactionCommitted(state, action);
    case actionTypes.onTransactionFailed:
      return onTransactionFailed(state, action);
    default:
      return state;
  }
};

export default reducer;