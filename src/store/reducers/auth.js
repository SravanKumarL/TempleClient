import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../client/shared/utility';

const initialState = {
  token: null,
  error: null,
  user: null,
  role: null,
  loading: false,
}

export const authStarted = (state, action) => {
  return updateObject(state, { loading: true });
}

export const authSuccess = (state, action) => {
  return updateObject(state, { token: action.token, user: action.user, role: action.role, loading: false });
}

export const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
}

export const logout = (state, action) => {
  return updateObject(state, { token: null });
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStarted(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

export default reducer;