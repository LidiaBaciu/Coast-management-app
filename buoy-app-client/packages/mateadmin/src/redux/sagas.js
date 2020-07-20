import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import contactSagas from './contacts/saga';
import problemsSagas from './problem/saga';
import beachList from './beachList/saga'

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    contactSagas(),
    problemsSagas(),
    beachList(),
  ]);
}
