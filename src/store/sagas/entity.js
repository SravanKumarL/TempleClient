import axios from '../../axios/poojas';
import { put, select } from 'redux-saga/effects'
import * as actions from '../actions/entity';
import * as transactionSagas from './transactions';
import constants, { reportMapping, uniqueProp } from './constants';
export function* handleTransaction(action) {
    const { type, collection, change, changedObj } = action.payload;
    if (collection === constants.Transactions && type === constants.add) {
        yield* transactionSagas.addTransactionSaga(action);
    }
    else {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error(`You are not allowed to ${type} ${collection}`);
            }
            else {
                const headers = {
                    'authorization': `${token}`,
                }
                let response = {};
                const resultantChange = changedObj ? { ...changedObj, ...change } : change;
                yield put(actions.onEntityTransactionCommitReq(type, resultantChange, collection));
                switch (type) {
                    case constants.add:
                        response = yield axios({
                            method: 'post',
                            url: `/${collection}/add`,
                            data: JSON.stringify(change),
                            headers
                        });
                        yield handleResponse(response, collection, type);
                        break;
                    case constants.delete:
                        const reqParam = change[uniqueProp(collection)];
                        response = yield axios({
                            method: 'delete',
                            url: `/${collection}/${reqParam}`,
                            headers
                        });
                        yield handleResponse(response, collection, type);
                        break;
                    case constants.edit:
                        response = yield axios({
                            method: 'put',
                            url: `/${collection}/${changedObj[uniqueProp(collection)]}`,
                            data: JSON.stringify(change),
                            headers
                        });
                        yield handleResponse(response, collection, type, changedObj);
                        break;
                    default:
                        break;
                }
            }
        }
        catch (error) {
            console.log(error);
            yield put(actions.onEntityTransactionFailed(error.message, collection))
        }
    }
}
const handleResponse = function* (response, collection, type, changedObj) {
    const { error, message, change } = response.data;
    if (error)
        yield put(actions.onEntityTransactionFailed(error, collection));
    else
        yield put(actions.onEntityTransactionCommitted(message, (changedObj ? { ...changedObj, ...change } : change), type, collection));
}
export function* handleFetchData(action) {
    const { collection, searchCriteria, refetch } = action.payload;
    const { pagingOptions, isPrintReq } = action.payload;
    const reportName = searchCriteria ? searchCriteria.ReportName : undefined;
    let skip, take = undefined;
    if (pagingOptions) {
        skip = pagingOptions.skip;
        take = pagingOptions.take;
    }
    if (collection === constants.Transactions) {
        yield* transactionSagas.getTransactionsSaga(action);
    }
    else {
        try {
            yield put(actions.onFetchEntityReq(collection, refetch));
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error(`You are not allowed to ${constants.get} the ${collection}`);
            } else {
                const headers = {
                    'authorization': `${token}`,
                }
                let response;
                const fetchCount = yield* checkFetchCount(collection);
                //If Count has already been fetched
                const toFetch = yield* checkFetch(collection, fetchCount, isPrintReq);
                const fetchOthers = yield* checkFetchOthers(collection, reportName, !fetchCount);
                if (fetchOthers || toFetch) {
                    if (collection === constants.Reports && searchCriteria) {
                        response = yield axios({
                            method: 'post',
                            data: { ...searchCriteria, take, skip },
                            url: `/${collection}?fetchCount=${fetchCount || fetchOthers}&fetchOthers=${fetchOthers}`,
                            headers
                        });
                    }
                    else {
                        response = yield axios({
                            method: 'get',
                            url: `/${collection}?take=${take}&skip=${skip}&fetchCount=${fetchCount}&fetchOthers=${undefined}`,
                            headers
                        });
                    }
                    if ((response && response.data.error)) {
                        throw new Error(response.data.error);
                    }
                    else {
                        yield put(actions.onFetchEntitySuccess(response.data, collection, fetchCount, fetchOthers, isPrintReq));
                    }
                }
            }
        } catch (error) {
            console.log(error);
            yield put(actions.onFetchEntityFailed(error.message, collection));
        }
    }
}
export function* handleFetchTotal(action) {
    const { collection, searchCriteria } = action.payload;
    const token = sessionStorage.getItem('token');
    try {
        if (!token) {
            throw new Error(`You are not allowed to ${constants.get} the ${collection}`);
        } else {
            const headers = {
                'authorization': `${token}`,
            }
            const totalAmountResponse = yield axios({
                method: 'post',
                data: { ...searchCriteria },
                url: `/${collection}/totalAmount`,
                headers
            });
            if (totalAmountResponse.data.error) {
                yield put(actions.onFetchTotalFailure(totalAmountResponse.data, collection));
            }
            yield put(actions.onFetchTotalSuccess(totalAmountResponse.data, collection));
        }
    }
    catch (error) {
        console.log(error);
        yield put(actions.onFetchEntityFailed(error.message, collection));
    }
}
export function* handleFetchSchema(action) {
    const { collection, searchCriteria } = action.payload;
    try {
        yield put(actions.onFetchEntityReq(collection));
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error(`You are not allowed to ${constants.get} ${constants.Schema} of the ${collection}`);
        } else {
            if (searchCriteria && collection === constants.Reports) {
                yield put(actions.onFetchEntitySchemaSuccess(reportMapping[searchCriteria.ReportName], collection));
            }
            else {
                const headers = {
                    'authorization': `${token}`,
                }
                const response = yield axios({
                    method: 'get',
                    url: `/${collection}/${constants.Schema}`,
                    headers
                });
                yield put(actions.onFetchEntitySchemaSuccess(response.data, collection));
            }
        }
    } catch (error) {
        console.log(error);
        yield put(actions.onFetchEntityFailed(error.message, collection));
    }
}
const checkFetchOthers = function* (collection, reportName, countFetched) {
    if (reportName !== constants.Management)
        return undefined;
    else {
        if (countFetched) {
            const rowState = yield select(getRowState(collection));
            if (rowState.rows.length === rowState.totalCount)
                return true;
            return true;//false
        }
        return false;
    }
}
const getRowState = collection => state => ({
    rows: state[collection].rows, totalCount: state[collection].totalCount,
    othersTotalCount: state[collection].othersTotalCount
});
const checkFetchCount = function* (collection) {
    return yield select(state => !state[collection].countFetched);
}
const checkFetch = function* (collection, toFetchCount, isPrintReq) {
    if (toFetchCount || isPrintReq)
        return true;
    const rowState = yield select(getRowState(collection));
    console.log(rowState.rows.length, rowState.totalCount, rowState.othersTotalCount);
    if (rowState.rows.length < rowState.totalCount + rowState.othersTotalCount) {
        return true;
    }
    return false;
}
