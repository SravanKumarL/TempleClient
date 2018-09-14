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
export const OPEN_EDIT_FORM = 'OPEN_EDIT_FORM';

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

// export const SELECTED_TRANSACTION_CHANGED = 'SELECTED_TRANSACTION_CHANGED';
export const EDITED_TRANSACTION_CHANGED = 'EDITD_TRANSACTION_CHANGED';
export const USED_TRANSACTION_CHANGED = 'USED_TRANSACTION_CHANGED';

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
export const onFetchTotalSuccess = 'ON_FETCH_TOTAL_SUCCESS';
export const onFetchTotalFailure = 'ON_FETCH_TOTAL_FAILURE';
export const fetchTotal = 'FETCH_TOTAL';

//DatePicker
export const ON_DAY_CHANGED = "ON_DAY_CHANGED";
export const ON_DATE_CHANGED = "ON_DATE_CHANGED";
export const ON_DATEPICKER_RESET = "ON_DATEPICKER_RESET";
export const ON_DAY_SLCTN_OPEN = "ON_DAY_SLCTN_OPEN";
export const ON_DAY_SLCTN_CLOSE = "ON_DAY_SLCTN_CLOSE";
export const ON_FILTER_APPLIED = "ON_FILTER_APPLIED";
export const ON_RANGE_PICKER_CLOSE = "ON_RANGE_PICKER_CLOSE";
export const ON_RANGE_PICKER_OPEN = "ON_RANGE_PICKER_OPEN";
export const ON_SINGLE_MULTI_DATE_CHANGED = "ON_SINGLE_MULTI_DATE_CHANGED";
export const SET_CALENDAR_OPTIONS = "SET_CALENDAR_OPTIONS";

//Board
export const CHANGE_BOARD_TAB = "CHANGE_BOARD_TAB";