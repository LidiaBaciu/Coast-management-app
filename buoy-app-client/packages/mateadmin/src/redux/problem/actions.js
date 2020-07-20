const actions = {
  GET_PROBLEM: 'GET_PROBLEM',
  UPDATE_PROBLEM: 'UPDATE_PROBLEM',
  UPDATE_PROBLEM_SAGA: 'UPDATE_PROBLEM_SAGA',
  SELECT_CURRENT_PROBLEM: 'SELECT_CURRENT_PROBLEM',
  TOGGLE_VIEW: 'PROBLEM_TOGGLE_VIEW',
  UPDATE_EDIT_PROBLEM: 'PROBLEM_UPDATE_EDIT_INVOICE',
  
  initData: () => ({ type: actions.GET_PROBLEM }),

  selectCurrentProblem: id => ({ type: actions.SELECT_CURRENT_PROBLEM, id }),
  toggleView: view => ({ type: actions.TOGGLE_VIEW, view }),
  editProblem: problem => ({ type: actions.UPDATE_EDIT_PROBLEM, invoice: problem })
};
export default actions;
