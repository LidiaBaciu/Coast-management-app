import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import contactSagas from './contacts/saga';
import notesSagas from './notes/saga';
import todosSagas from './todos/saga';
import invoicesSagas from './invoice/saga';
import instagramWidgetSagas from './instagramWidget/sagas';
import scrumBoardSagas from './scrumBoard/saga';
import customAppSagas from '../customApp/redux/sagas';
import beachList from './beachList/saga'

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    contactSagas(),
    notesSagas(),
    todosSagas(),
    invoicesSagas(),
    instagramWidgetSagas(),
    customAppSagas(),
    scrumBoardSagas(),
    beachList(),
  ]);
}
