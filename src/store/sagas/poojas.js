import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios/poojas';

export function* addPoojaSaga(action) {
  try {
    yield put(actions.addPoojaStarted());
    const token = localStorage.getItem('token');
    if (!token) {
      const error = { message: 'You are not allowed to add Pooja' };
      yield put(actions.addPoojaFail(error));
    } else {
      const headers = {
        'authorization': `${token}`,
      }
      const response = yield axios({
        method: 'post',
        url: '/addPooja',
        data: action.poojaDetails,
        headers
      });
      yield put(actions.addPoojaSuccess(response.data.message));
    }
  }
  catch (error) {
    yield put(actions.addPoojaFail(error));
  }
}

export function* getPoojaDetailsSaga(action) {
  try {
    yield put(actions.getPoojaDetailsStarted());
    const token = localStorage.getItem('token');
    if (!token) {
      const error = { message: 'You are not allowed to get Pooja Details' };
      yield put(actions.getPoojaDetailsFail(error));
    } else {
      const headers = {
        'authorization': `${token}`,
      }
      const response = yield axios({
        method: 'get',
        url: '/getPoojaDetails',
        headers
      });
      yield put(actions.getPoojaDetailsSuccess(response.data.poojaDetails));
    }
  } catch (error) {
    yield put(actions.getPoojaDetailsFail(error));
  }
}
