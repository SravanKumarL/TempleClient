import * as actionTypes from './actionTypes';


export const changeBoardTab = (activeTab) => {
  return {
    type: actionTypes.CHANGE_BOARD_TAB,
    payload: activeTab,
  }
};