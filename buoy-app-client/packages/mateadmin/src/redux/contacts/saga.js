import {put, all, takeEvery, fork, call } from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';

let tokenStr = JSON.parse(localStorage.getItem('token'));

export function* updateContacts() {
  yield takeEvery(actions.UPDATE_CONATCTS, function*() {});
}

function getContacts() {
    let webApiUrl = 'http://localhost:8080/api/users/admins';
    return axios.get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } });
}

function* fetchContacts() {
    console.log("in fetchContacts");
    const response = yield call(getContacts);
    if(response){
      console.log(response.data);
      yield put({ 
        type: actions.CONTACTS_RECEIVED, 
        payload: {contacts : response.data},
      });
    } else {
      console.log("error");
    }
}

export default function* rootSaga() {
  yield all(
    [fork(updateContacts)],
    yield takeEvery(actions.GET_CONTACTS, fetchContacts),
  );
  
}
