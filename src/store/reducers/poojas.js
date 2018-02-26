import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../client/shared/utility';

const initialState = {
  message: null,
  error: null,
  poojaDetails: null,
  loading: false,
}

export const addPoojaStarted = (state, action) => {
  return updateObject(state, { loading: true });
}

export const addPoojaSuccess = (state, action) => {
  return updateObject(state, { message: action.message, loading: false, });
}

export const addPoojaFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
}

export const getPoojaDetailsStarted = (state, action) => {
  return updateObject(state, { loading: true });
}
export const getPoojaDetailsSuccess = (state, action) => {
  return updateObject(state, { poojaDetails: action.poojaDetails, loading: false, });
}
export const getPoojaDetailsFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POOJA_START:
      return addPoojaStarted(state, action);
    case actionTypes.ADD_POOJA_SUCCESS:
      return addPoojaSuccess(state, action);
    case actionTypes.ADD_POOJA_FAIL:
      return addPoojaFail(state, action);
    case actionTypes.GET_POOJADETAILS_START:
      return getPoojaDetailsStarted(state, action);
    case actionTypes.GET_POOJADETAILS_SUCCESS:
      return getPoojaDetailsSuccess(state, action);
    case actionTypes.GET_POOJADETAILS_FAIL:
      return getPoojaDetailsFail(state, action);
    default:
      return state;
  }
};

export default reducer;