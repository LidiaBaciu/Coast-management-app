import { all, takeEvery, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { clearToken, getToken } from '../../helpers/utility';
import actions from './actions';
import axios from 'axios';

function loginApi(payload){
  return axios.post('http://localhost:8080/api/auth/signin', payload);
}

function registerApi(payload){
  return axios.post('http://localhost:8080/api/auth/signup', payload);
}

export function* loginRequest({payload}) {
  console.log(JSON.stringify(payload));
  const response = yield call(loginApi, payload);
  if(response){
    yield put({
      type: actions.LOGIN_SUCCESS,
      payload: {user: response.data},
      profile: 'Profile',
    });
  } else {
    yield put({ type: actions.LOGIN_ERROR });
  }
  console.log(response.data);
}

export function* registerRequest({payload}){
  console.log(payload);
  const response = yield call(registerApi, payload);
  console.log('response register from yield', JSON.parse(response));
  if(response){
    console.log("User succesfully ", response.data);
  } 
}


export function* loginSuccess({ payload }) {
  console.log(JSON.stringify(payload));
  yield localStorage.setItem('id_token', payload.accessToken);
  
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