import * as actionTypes from './actionTypes';


export const changeTransactionsTab = (activeTab) => {
  return {
    type: actionTypes.CHANGE_TRANSACTIONS_TAB,
    payload: activeTab,
  }
};