import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';
import shortid from 'shortid';
import constants, { uniqueProp } from '../sagas/constants';
const initialState = {
    columns: [], rows: [], loading: false, error: '', message: '', change: {}, prevRows: [],
    printReq: false, totalCount: 0, othersTotalCount: 0, totalAmount: {}, countFetched: false, othersFetched: false,
    cheques: []
};
export const entity = (name) => (state = initialState, action) => {
    const { payload } = action;
    if (payload && name !== payload.name) return state;
    const fetchState = {
        ...state, rows: mergeRows(state, payload),
        loading: ((payload && payload.loading) || false) || false, error: '', name
    };
    switch (action.type) {
        case actionTypes.onFetchEntityReq:
            return { ...fetchState };
        case actionTypes.onFetchEntitySuccess:
            return {
                ...fetchState, printReq: payload.printReq || state.printReq, totalCount: payload.totalCount || state.totalCount,
                othersTotalCount: payload.othersTotalCount || state.othersTotalCount,
                countFetched: payload.countFetched || state.countFetched,
                othersFetched: payload.othersFetched || state.othersFetched,
            };
        case actionTypes.onFetchTotalSuccess:
            return {
                ...fetchState, totalAmount: payload.totalAmount || state.totalAmount,
                cheques: payload.cheques || state.cheques
            };
        case actionTypes.onFetchTotalFailure:
            return { ...fetchState, totalAmount: {}, error: action.payload.error };
        case actionTypes.onFetchEntitySchemaSuccess:
            return {
                ...state, columns: action.payload.columns, loading: action.payload.loading, error: '', name,
                printReq: action.payload.printReq
            };
        case actionTypes.onFetchEntityFailed:
            return { ...state, rows: state.rows, error: action.payload.error, loading: false, name };
        case actionTypes.onEntityTransactionCommitted:
            return {
                ...state, message: action.payload.message, error: '', name, rows: changeRows(payload, state.rows, true)
            };
        case actionTypes.onEntityTransactionCommitReq:
            return {
                ...state, error: '', message: '', rows: changeRows(payload, state.rows), prevRows: state.rows, name
            };
        case actionTypes.clearEntityMessages:
            return { ...state, error: '', message: '' };
        case actionTypes.onEntityTransactionFailed:
            return { ...state, error: action.payload.error, message: '', name, rows: state.prevRows };
        case actionTypes.resetEntity:
            return initialState;
        default:
            return state;
    }
};
const mergeRows = (state, payload) => {
    if (!payload || !payload.rows)
        return state.rows;
    else if (payload.printReq)
        return [...payload.rows, ...state.rows.filter(row => row.others)].map(row => row !== 0 ?
            ({ ...row, id: shortid.generate() }) : row);
    else {
        let rows = _.cloneDeep(state.rows);
        if (rows.length === 0 && payload.totalCount)
            rows = new Array(payload.totalCount).fill(0);
        if (payload.rows.some(row => row.others)) {
            return [...rows, ...payload.rows.map(row => ({ ...row, id: shortid.generate() }))];
        }
        const skip = (payload.pagingOptions && payload.pagingOptions.skip) || state.rows.length;
        const primaryKey = uniqueProp(payload.name);
        if (!(state.rows.filter(row => row !== 0).every(row => primaryKey in row) &&
            payload.rows.every(row => primaryKey in row))) {
            if (payload.rows.length > 0) {
                rows.splice(skip, payload.rows.length, ...payload.rows);
            }
            return rows.map(row => row !== 0 ? ({ ...row, id: shortid.generate() }) : row);
        }
        const prevRowKeys = state.rows.map(row => row[primaryKey]);
        const newRows = payload.rows.filter(row => prevRowKeys.indexOf(row[primaryKey]) === -1);
        if (newRows.length > 0) {
            rows.splice(skip, newRows.length, ...newRows);
        }
        return rows.map(row => row !== 0 ? ({ ...row, id: row[primaryKey] }) : row);
    }
}
const changeRows = (payload, rows, commitSucessful = false) => {
    const { type, change, name } = payload;
    if (!change) return rows;
    const prop = uniqueProp(name);
    switch (type) {
        case constants.add:
            if (commitSucessful) {
                return [...rows.filter(row => row === 0 || !row.toChange), { ...change }];
            }
            else {
                return [...rows, { ...change, toChange: true }]
            }
        case constants.edit:
            return rows.map(row => row === 0 ? row : (row[prop] === change[prop] ? change : row));
        case constants.delete:
            const uniquePropVal = change[prop];
            return rows.filter(row => row === 0 || row[prop] !== uniquePropVal);
        default:
            return rows;
    }
}
export const defaultInitialState = initialState;