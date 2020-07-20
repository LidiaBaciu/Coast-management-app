import { all, takeEvery, put, call} from 'redux-saga/effects';
import { localDataName } from '../../containers/Problems/config';
import actions from './actions';
import axios from 'axios';

function getProblemsReported() {
  let tokenStr = JSON.parse(localStorage.getItem('token'));
  return axios.get('http://localhost:8080/api/problems', { headers: { Authorization: `Bearer ${tokenStr}` } });
}
/*
function changeProblemStatus(payload) {
  let tokenStr = JSON.parse(localStorage.getItem('token'));
  console.log(payload.id);
  return axios.put('http://localhost:8080/api/problem/' + payload.id, { headers: { Authorization: `Bearer ${tokenStr}` } });
}
*/

export function* getInvoice() {
  const response = yield call(getProblemsReported);
  if (response) {
    yield put({
      type: actions.UPDATE_PROBLEM,
      problems: response.data
    });
  } 
}
export function* updateInvoiceSaga({ problems, problem }) {
  yield localStorage.setItem(localDataName, JSON.stringify(problems));

  yield put({
    type: actions.UPDATE_PROBLEM,
    problems,
    problem
  });
}
export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_PROBLEM, getInvoice),
    yield takeEvery(actions.UPDATE_PROBLEM_SAGA, updateInvoiceSaga)
  ]);
}
