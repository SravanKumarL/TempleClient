import * as actionTypes from '../actions/actionTypes';
import { updateObject, writeData } from '../../client/shared/utility';
// const recentList = 

const initialState = {
  message: null,
  error: null,
  transactions: null,
  searchedTransactions: [],
  loading: false,
  totalCount: 0,
  canBePrinted: false,
  isPrinted: false,
  // selectedTransaction: null,
  usedTransaction: null,
  editedTransaction: null,
  option: null,
  editFormOpen: false,
  recentList: [],
}
export const openEditForm = (state, action) => {
  return updateObject(state, { editFormOpen: action.payload });
}
export const addTransactionStarted = (state, action) => {
  return updateObject(state, { loading: true });
}
export const addTransactionSuccess = (state, action) => {
  return updateObject(state, { message: action.message, loading: false });
}
export const addTransactionFail = (state, action) => {
  return updateObject(state, { error: action.error, message: null, loading: false });
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
    searchedTransactions: action.refetch ? [...state.transactions, ...action.transactions] : action.transactions, loading: false,
    totalCount: action.totalCount || state.totalCount
  });
}
export const searchTransactionsReset = (state, action) => {
  return updateObject(state, {
    searchedTransactions: initialState.searchedTransactions,
    totalCount: initialState.totalCount,
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
export const usedTransactionChanged = (state, action) => {
  return updateObject(state, { usedTransaction: action.transaction, option: action.option });
}
export const editedTransactionChanged = (state, action) => {
  return updateObject(state, { editedTransaction: action.transaction, option: action.option });
}
export const canBePrintedChanged = (state, action) => {
  return updateObject(state, { canBePrinted: action.payload });
}

export const isPrintedChanged = (state, action) => {
  return updateObject(state, { isPrinted: action.payload });
}

export const addToRecentList = (state, action) => {
  let currentRecentList = [...state.recentList];
  if (currentRecentList.length >= 14) {
    currentRecentList.splice(-1, 1);
  }
  currentRecentList.splice(0, 0, action.payload);
  const currentUser = sessionStorage.getItem('user');
  const list = { user: currentUser, recentList: currentRecentList };
  writeData('users', list);
  return updateObject(state, { recentList: currentRecentList });
}

export const loadRecentList = (state, action) => {
  return updateObject(state, { recentList: action.payload ? action.payload : [] });
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_EDIT_FORM:
      return openEditForm(state, action);
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
    case actionTypes.SEARCH_TRANSACTIONS_RESET:
      return searchTransactionsReset(state, action);

    case actionTypes.ON_TRANSACTION_COMMITTED:
      return onTransactionCommitted(state, action);
    case actionTypes.ON_TRANSACTION_FAILED:
      return onTransactionFailed(state, action);

    case actionTypes.USED_TRANSACTION_CHANGED:
      return usedTransactionChanged(state, action);
    case actionTypes.EDITED_TRANSACTION_CHANGED:
      return editedTransactionChanged(state, action);
    case actionTypes.CAN_BE_PRINTED_CHANGED:
      return canBePrintedChanged(state, action);
    case actionTypes.IS_PRINTED_CHANGED:
      return isPrintedChanged(state, action);
    case actionTypes.ADD_TO_RECENT_LIST:
      return addToRecentList(state, action);
    case actionTypes.LOAD_RECENT_LIST:
      return loadRecentList(state, action);
    default:
      return state;
  }
};

export default reducer;