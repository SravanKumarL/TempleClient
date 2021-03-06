import * as actionTypes from './actionTypes';

export const openEditForm = (status) => {
  return {
    type: actionTypes.OPEN_EDIT_FORM,
    payload: status
  }
}
export const addTransactionStarted = () => {
  return {
    type: actionTypes.ADD_TRANSACTION_START,
  }
}

export const addTransactionSuccess = (message) => {
  return {
    type: actionTypes.ADD_TRANSACTION_SUCCESS,
    message
  }
}

export const addTransactionFail = (error) => {
  return {
    type: actionTypes.ADD_TRANSACTION_FAIL,
    error
  }
}

export const getTransactionsStarted = () => {
  return {
    type: actionTypes.GET_TRANSACTIONS_START,
  }
}
export const getTransactionsSuccess = (transactions) => {
  return {
    type: actionTypes.GET_TRANSACTIONS_SUCCESS,
    transactions,
  }
}

export const getTransactionsFail = (error) => {
  return {
    type: actionTypes.GET_TRANSACTIONS_FAIL,
    error
  }
}

export const searchTransactions = (searchData, fetchCount = false, refetch = false) => {
  return {
    type: actionTypes.SEARCH_TRANSACTIONS,
    fetchCount,
    searchData,
    refetch
  }
}
export const searchTransactionsStarted = () => {
  return {
    type: actionTypes.SEARCH_TRANSACTIONS_START,
  }
}
export const searchTransactionsSuccess = (responseData, refetch = false) => {
  return {
    type: actionTypes.SEARCH_TRANSACTIONS_SUCCESS,
    transactions: responseData.transactions,
    totalCount: responseData.totalCount,
    refetch
  }
}

export const searchTransactionsFail = (error) => {
  return {
    type: actionTypes.SEARCH_TRANSACTIONS_FAIL,
    error
  }
}

export const usedTransactionChanged = (transaction, option) => {
  return {
    type: actionTypes.USED_TRANSACTION_CHANGED,
    transaction,
  }
}
export const editedTransactionChanged = (transaction, option) => {
  return {
    type: actionTypes.EDITED_TRANSACTION_CHANGED,
    transaction,
  }
}
export const canBePrintedChanged = (status) => {
  return {
    type: actionTypes.CAN_BE_PRINTED_CHANGED,
    payload: status,
  }
}

export const isPrintedChanged = (status) => {
  return {
    type: actionTypes.IS_PRINTED_CHANGED,
    payload: status,
  }
}

export const addToRecentList = (transaction) => {
  return {
    type: actionTypes.ADD_TO_RECENT_LIST,
    payload: transaction,
  }
}

export const loadRecentList = (recentList) => {
  return {
    type: actionTypes.LOAD_RECENT_LIST,
    payload: recentList,
  }
}

export const searchReset = () => {
  return {
    type: actionTypes.SEARCH_TRANSACTIONS_RESET,
  }
}