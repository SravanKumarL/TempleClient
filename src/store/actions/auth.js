import * as actionTypes from './actionTypes';

export const authUser = (username, password, role) => {
  return {
    type: actionTypes.AUTHENTICATE,
    username,
    password,
    role
  }
};

export const authStarted = () => {
  return {
    type: actionTypes.AUTH_START,
  }
};

export const authSuccess = (token, user, role) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    user,
    role,
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const autoSignIn = () => {
  return {
    type: actionTypes.AUTH_AUTO_SIGNIN,
  };
}

// export const checkAuthTimeout = (expirationTime) => {
//   return {
//     type: actionTypes.AUTH_CHECK_TIMEOUT,
//     expirationTime
//   }
// }

// export const authCheckState = () => {
//   return {
//     type: actionTypes.AUTH_CHECK_STATE,
//   }
// }

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('user');
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}