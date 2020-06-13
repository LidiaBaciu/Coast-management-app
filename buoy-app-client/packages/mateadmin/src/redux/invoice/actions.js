const actions = {
  GET_INVOICE: 'GET_INVOICE',
  UPDATE_INVOICE: 'UPDATE_INVOICE',
  UPDATE_INVOICE_SAGA: 'UPDATE_INVOICE_SAGA',
  SELECT_CURRENT_INVOICE: 'SELECT_CURRENT_INVOICE',
  TOGGLE_VIEW: 'INVOICE_TOGGLE_VIEW',
  UPDATE_EDIT_INVOICE: 'INVOICE_UPDATE_EDIT_INVOICE',
  
  initData: () => ({ type: actions.GET_INVOICE }),

  selectCurrentInvoice: id => ({ type: actions.SELECT_CURRENT_INVOICE, id }),
  toggleView: view => ({ type: actions.TOGGLE_VIEW, view }),
  editInvoice: invoice => ({ type: actions.UPDATE_EDIT_INVOICE, invoice })
};
export default actions;
