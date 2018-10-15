import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import * as actions from '../actions';
import axios from '../../axios/transactions';
import { readAllData } from '../../client/shared/utility';


export function* signInSaga(action) {
  try {
    yield put(actions.authStarted());
    yield delay(1000);
    const authData = {
      username: action.username,
      password: action.password,
      role: action.role,
    };

    const response = yield axios.post('/signin', authData);
    if (response.data.role !== action.role) {
      return yield put(actions.authFail({ error: 'Please check the role you selected for signin' }));
    }
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    sessionStorage.setItem('token', response.data.token);
    sessionStorage.setItem('expirationDate', expirationDate);
    sessionStorage.setItem('user', response.data.user);
    sessionStorage.setItem('role', response.data.role);
    const currentUserRecentListData = yield readAllData('users');
    const recentList = currentUserRecentListData[0].user === response.data.user ? currentUserRecentListData[0].recentList : [];
    yield put(actions.loadRecentList(recentList));
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
    const token = yield sessionStorage.getItem('token');
    const user = yield sessionStorage.getItem('user');
    const role = yield sessionStorage.getItem('role');
    if (!token) {
      yield put(actions.authLogout());
    } else {
      // const expirationDate = yield new Date(sessionStorage.getItem('expirationDate'));
      // if (expirationDate >= new Date()) {
      // const userId = yield sessionStorage.getItem('userId');
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