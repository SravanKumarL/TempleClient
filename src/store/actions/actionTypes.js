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

export const ON_TRANSACTION_COMMITTED = 'ON_TRANSACTION_COMMITTED';
export const ON_TRANSACTION_FAILED = 'ON_TRANSACTION_FAILED';

export const SELECTED_TRANSACTION_CHANGED = 'SELECTED_TRANSACTION_CHANGED';
//Entity
export const resetEntity = 'RESET_ENTITY';
export const commitEntityTransaction = 'COMMIT_ENTITY_TRANSACTION';
export const onEntityTransactionCommitReq = 'ON_ENTITY_TRANSACTION_COMMIT_REQ';
export const fetchEntityData = 'FETCH_ENTITY_DATA';
export const fetchEntitySchema = 'FETCH_ENTITY_SCHEMA';
export const onFetchEntitySchemaSuccess = 'ON_FETCH_ENTITY_SCHEMA_SUCCESS';
export const onFetchEntityReq = 'ON_FETCH_ENTITY_REQ';
export const onFetchEntitySuccess = 'ON_FETCH_ENTITY_SUCCESS';
export const onFetchEntityFailed = 'ON_FETCH_ENTITY_FAILED';
export const onEntityTransactionFailed = 'ON_ENTITY_TRANSACTION_FAILED';
export const onEntityTransactionCommitted = 'ON_ENTITY_TRANSACTION_COMMITTED';
export const clearEntityMessages = 'CLEAR_ENTITY_MESSAGES';