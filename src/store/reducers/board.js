import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../client/shared/utility';
import { TABS } from '../constants/board';

const initialState = {
  activeTab: TABS.TRANSACTIONS
}

const changeBoardTab = (state, action) => {
  return updateObject(state, { activeTab: action.payload });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BOARD_TAB:
      return changeBoardTab(state, action);
    default:
      return state;
  }
};

export default reducer;