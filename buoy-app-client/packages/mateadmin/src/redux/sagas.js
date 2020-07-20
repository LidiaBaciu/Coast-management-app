import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import contactSagas from './contacts/saga';
import invoicesSagas from './invoice/saga';
import instagramWidgetSagas from './instagramWidget/sagas';
import beachList from './beachList/saga'

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    contactSagas(),
    invoicesSagas(),
    instagramWidgetSagas(),
    beachList(),
  ]);
}
