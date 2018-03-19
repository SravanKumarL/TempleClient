// Authentication
export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_CHECK_STATE = 'AUTH_CHECK_STATE';
export const AUTH_AUTO_SIGNIN = 'AUTH_AUTO_SIGNIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

//Transactions
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const ADD_TRANSACTION_START = 'ADD_TRANSACTION_START';
export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS';
export const ADD_TRANSACTION_FAIL = 'ADD_TRANSACTION_FAIL';

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const GET_TRANSACTIONS_START = 'GET_TRANSACTIONS_START';
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
export const GET_TRANSACTIONS_FAIL = 'GET_TRANSACTIONS_FAIL';

export const SEARCH_TRANSACTIONS = 'SEARCH_TRANSACTIONS';
export const SEARCH_TRANSACTIONS_START = 'SEARCH_TRANSACTIONS_START';
export const SEARCH_TRANSACTIONS_SUCCESS = 'SEARCH_TRANSACTIONS_SUCCESS';
export const SEARCH_TRANSACTIONS_FAIL = 'SEARCH_TRANSACTIONS_FAIL';

//Db Router

export const commitTransaction='COMMIT_TRANSACTION';
export const onTransactionCommitReq='ON_TRANSACTION_COMMIT_REQ';
export const fetchData='FETCH_DATA';
export const onFetchReq= 'ON_FETCH_REQ';
export const onFetchSuccess= 'ON_FETCH_SUCCESS';
export const onFetchFailed= 'ON_FETCH_FAILED';
export const onTransactionFailed='ON_TRANSACTION_FAILED';
export const onTransactionCommitted='ON_TRANSACTION_COMMITTED';