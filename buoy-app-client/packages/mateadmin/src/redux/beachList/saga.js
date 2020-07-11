import { put, takeLatest, all, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import actions from './actions';

let tokenStr = JSON.parse(localStorage.getItem('token'));

function getBeaches() {
    let webApiUrl = 'http://localhost:8080/api/beaches';
    return axios.get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } });
}

function addBeach(payload){
  let webApiUrl = 'http://localhost:8080/api/beach/create';
  return axios.post(webApiUrl, payload, { headers: { Authorization: `Bearer ${tokenStr}` } });
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

function* addBeachRequest( {payload} ){
  console.log("in addBeachRequest");
  console.log(payload);
  const response = yield call(addBeach, payload);
  console.log('response from addBeachRequest: ', response);
  if (response) {
    console.log('Beach added succesfully ', response.data);
    const responseGetBeaches = yield call(getBeaches);
    if(responseGetBeaches){
      yield put({ 
        type: actions.BEACHES_RECEIVED, 
        payload: {beaches : responseGetBeaches.data},
      });
    } else {
      console.log("error");
    }
  } 

}


export default function* rootSaga() {
  yield all([
    yield takeLatest(actions.GET_BEACHES, fetchBeaches),
    yield takeEvery(actions.ADD_BEACH_REQUEST, addBeachRequest),
  ]);
}