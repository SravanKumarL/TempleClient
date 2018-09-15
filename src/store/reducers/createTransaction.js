import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../client/shared/utility';
import { TABS, FIELDS } from '../constants/transactions';

const { PHONE_NUMBER, NAMES, GOTHRAM, NAKSHATRAM, POOJA, DATES, PAYMENT_MODE, NUMBER_OF_DAYS, AMOUNT } = FIELDS;

const initialState = {
  activeTab: TABS.POOJAS,
  transaction: null,
  form: {
    [PHONE_NUMBER]: '',
    [NAMES]: '',
    [GOTHRAM]: '',
    [NAKSHATRAM]: '',
    [POOJA]: '',
    [DATES]: '',
    [PAYMENT_MODE]: '',
    [NUMBER_OF_DAYS]: () => this[DATES].length,
    [AMOUNT]: ''
  }
};

const changeTransactionsTab = (state, action) => {
  return updateObject(state, { activeTab: action.payload });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_TRANSACTIONS_TAB:
      return changeTransactionsTab(state, action);
    default:
      return state;
  }
};

export default reducer;