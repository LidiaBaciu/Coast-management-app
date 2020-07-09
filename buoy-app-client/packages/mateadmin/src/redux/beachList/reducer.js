
import actions from './actions';

const initialState = {
  beaches: [],
  searchText: '',
  filteredBeaches: [],
}

const filterBeaches = (beaches, searchText) => {
	if (searchText.length === 0) {
		return beaches;
	}
	searchText = searchText.toLowerCase();
	const newBeaches = [];
	beaches.forEach(beach => {
		if (beach.name && beach.name.toLowerCase().indexOf(searchText) > -1) {
			newBeaches.push(beach);
		}
	});
	return newBeaches;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actions.BEACHES_RECEIVED:
        return { 
          beaches: action.payload.beaches,
          filteredBeaches: action.payload.beaches,
         }
      case actions.SEARCH_BEACH:
      return {
        ...state,
        searchText: action.searchText,
        filteredBeaches: filterBeaches(state.beaches, action.searchText),
      };
      default:
        return state;
    }
  };
  
  export default reducer;