import * as actionTypes from './actionTypes';


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

export const searchTransactions = (searchData, fetchCount = false) => {
  return {
    type: actionTypes.SEARCH_TRANSACTIONS,
    fetchCount,
    searchData,
  }
}
export const searchTransactionsStarted = () => {
  return {
    type: actionTypes.SEARCH_TRANSACTIONS_START,
  }
}
export const searchTransactionsSuccess = (responseData) => {
  return {
    type: actionTypes.SEARCH_TRANSACTIONS_SUCCESS,
    transactions: responseData.transactions,
    count: responseData.count
  }
}

export const searchTransactionsFail = (error) => {
  return {
    type: actionTypes.SEARCH_TRANSACTIONS_FAIL,
    error
  }
}
