import { all, takeEvery, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { clearToken, getToken } from '../../helpers/utility';
import actions from './actions';
import {register} from './apiUtils';
const fakeApiCall = "";

export function* loginRequest() {
  if (fakeApiCall) {
    yield put({
      type: actions.LOGIN_SUCCESS,
      payload: { token: 'secret token' },
      profile: 'Profile',
    });
  } else {
    yield put({ type: actions.LOGIN_ERROR });
  }
}

export function* registerRequest({payload}){
  console.log(payload);
  register(payload)
  .then(response => {
      console.log("success");
  }).catch(error => {
    console.log(error);
  });
}


export function* loginSuccess({ payload }) {
  yield localStorage.setItem('id_token', payload.token);
}

export function* loginError() {}

export function* logout() {
  clearToken();
  yield put(push('/'));
}
export function* checkAuthorization() {
  const token = getToken();
  if (token) {
    yield put({
      type: actions.LOGIN_SUCCESS,
      payload: { token },
      profile: 'Profile',
    });
  }
}
export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.CHECK_AUTHORIZATION, checkAuthorization),
    yield takeEvery(actions.LOGIN_REQUEST, loginRequest),
    yield takeEvery(actions.LOGIN_SUCCESS, loginSuccess),
    yield takeEvery(actions.LOGIN_ERROR, loginError),
    yield takeEvery(actions.LOGOUT, logout),
    yield takeEvery(actions.REGISTER_REQUEST, registerRequest),
  ]);
}