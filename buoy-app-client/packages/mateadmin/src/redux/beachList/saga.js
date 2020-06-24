import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import actions from './actions';

function getBeaches() {
    let tokenStr = JSON.parse(localStorage.getItem('token'));
    let webApiUrl = 'http://localhost:8080/api/beaches';
    return axios.get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } });
}

function* fetchBeaches() {
    console.log("in fetchBeaches");
    const response = yield call(getBeaches);
    if(response){
      yield put({ 
        type: actions.BEACHES_RECEIVED, 
        payload: {beaches : response.data},
      });
    } else {
      console.log("error");
    }
}

function* actionWatcher() {
  yield takeLatest('GET_BEACHES', fetchBeaches)
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}