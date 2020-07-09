
import actions from './actions';

const initialState = {
  beaches: [],
  searchText: '',
  filteredBeaches: [],
}

const filterBeaches = (beaches, searchText) => {
  console.log("in filter Beaches");
	if (searchText.length === 0) {
		return beaches;
	}
	searchText = searchText.toLowerCase();
	const newContacts = [];
	beaches.forEach(contact => {
		if (contact.name && contact.name.toLowerCase().indexOf(searchText) > -1) {
			console.log(contact);
			newContacts.push(contact);
		}
	});
	return newContacts;
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