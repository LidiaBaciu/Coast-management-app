import { all, takeEvery, put, call} from 'redux-saga/effects';
import { localDataName, createDemoData } from '../../containers/Invoice/config';
import actions from './actions';
import axios from 'axios';

function getProblemsReported() {
  let tokenStr = JSON.parse(localStorage.getItem('token'));
  return axios.get('http://localhost:8080/api/problems', { headers: { Authorization: `Bearer ${tokenStr}` } });
}

export function* getInvoice() {
  const response = yield call(getProblemsReported);
  if (response) {
    yield put({
      type: actions.UPDATE_INVOICE,
      invoices: response.data
    });
  } 
}
export function* updateInvoiceSaga({ invoices, invoice }) {
  yield localStorage.setItem(localDataName, JSON.stringify(invoices));
  yield put({
    type: actions.UPDATE_INVOICE,
    invoices,
    invoice
  });
}
export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_INVOICE, getInvoice),
    yield takeEvery(actions.UPDATE_INVOICE_SAGA, updateInvoiceSaga)
  ]);
}
