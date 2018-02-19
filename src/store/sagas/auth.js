import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from 'axios';

export function* signInSaga(action) {
  // Submit the username, password and role to the server
  try {
    const authData = {
      username: action.username,
      password: action.password,
      role: action.role,
    };

    const response = yield axios.post('http://localhost:7000/signin', authData);
    if (response.data.role !== action.role) {
      return yield put(actions.authFail({ error: 'Please check the role you selected for signin' }));
    }
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('user', response.data.user);
    localStorage.setItem('role', response.data.role);
    yield put(actions.authSuccess(response.data.token, response.data.user, response.data.role));
  }
  catch (error) {
    yield put(actions.authFail(error));
  }

  //If the request is good...
  //- Update the state to indicate user is authenticated
  // save the jwt token
  // redirect the user to dashboard

  // If request is bad
  //- Show an error to the user
  // yield put(actions.authSuccess(token));
}

export function* autoSigninSaga(action) {
  try {
    const token = yield localStorage.getItem('token');
    const user = yield localStorage.getItem('user');
    const role = yield localStorage.getItem('role');
    if (!token) {
      yield put(actions.authLogout());
    } else {
      // const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
      // if (expirationDate >= new Date()) {
      // const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, user, role));
      // yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      // } else {
      //   yield put(actions.authLogout());
      // }
    }
  }
  catch (error) {
    yield put(actions.authFail(error));
  }
}