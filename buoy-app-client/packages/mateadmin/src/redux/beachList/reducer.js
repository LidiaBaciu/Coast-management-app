
import actions from './actions';

const initialState = {
  beaches: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actions.BEACHES_RECEIVED:
        return { 
          beaches: action.payload.beaches,
         }
      default:
        return state;
    }
  };
  
  export default reducer;