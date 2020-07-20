import clone from 'clone';
import actions from './actions';

const initState = {
  problems: [],
  initialProblems: false,
  currentProblem: {},
  editableProblem: {},
  isNewProblem: false,
  enableEditView: false
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.UPDATE_PROBLEM: {
      const currentProblem = action.problem
        ? action.problem
        : state.currentProblem;
      return {
        ...state,
        problems: action.problems,
        currentProblem: clone(currentProblem),
        initialProblems: true,
        isNewProblem: false,
        enableEditView: false
      };
    }
    case actions.SELECT_CURRENT_PROBLEM: {
      const problems = state.problems;
      const index = problems.map(problem => problem.id).indexOf(action.id);
      const isNewProblem = index === -1;
      const currentProblem = isNewProblem
        ? {
            id: action.id,
            number: `#${action.id}`,
            key: action.id
          }
        : problems[index];
      const enableEditView = isNewProblem;
      return {
        ...state,
        currentProblem: currentProblem,
        editableProblem: clone(currentProblem),
        isNewProblem: isNewProblem,
        enableEditView: enableEditView
      };
    }
    case actions.TOGGLE_VIEW:
      return {
        ...state,
        enableEditView: action.view,
        editableProblem: clone(state.currentProblem)
      };
    case actions.UPDATE_EDIT_PROBLEM:
      return { ...state, editableProblem: clone(action.problem) };
    default:
      return state;
  }
}
