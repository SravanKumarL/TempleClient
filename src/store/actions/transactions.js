import * as actionTypes from './actionTypes';

export const addTransaction = (transaction) => {
  return {
    type: actionTypes.ADD_TRANSACTION,
    transaction
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
export const getTransactions = () => {
  return {
    type: actionTypes.GET_TRANSACTIONS,
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

export const searchTransactions = (searchData) => {
  return {
    type: actionTypes.SEARCH_TRANSACTIONS,
    searchData,
  }
}
export const searchTransactionsStarted = () => {
  return {
    type: actionTypes.SEARCH_TRANSACTIONS_START,
  }
}
export const searchTransactionsSuccess = (transactions) => {
  return {
    type: actionTypes.SEARCH_TRANSACTIONS_SUCCESS,
    transactions,
  }
}

export const searchTransactionsFail = (error) => {
  return {
    type: actionTypes.SEARCH_TRANSACTIONS_FAIL,
    error
  }
}
