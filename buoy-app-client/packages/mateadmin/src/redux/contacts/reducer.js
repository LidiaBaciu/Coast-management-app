
import actions, { ascendingSort } from './actions';


const initState = {
	searchText: '',
	contacts: [],
	filteredContacts: [],
	seletedContact: null,
};

const filterContacts = (contacts, searchText) => {
	if (searchText.length === 0) {
		return contacts;
	}
	searchText = searchText.toLowerCase();
	const newContacts = [];
	contacts.forEach(contact => {
		if (contact.name && contact.name.toLowerCase().indexOf(searchText) > -1) {
			console.log(contact);
			newContacts.push(contact);
		}
	});
	return newContacts;
};

export default function contactReducer(state = initState, action) {
	switch (action.type) {
		case actions.CONTACTS_RECEIVED:
			return { 
				contacts: action.payload.contacts.sort(ascendingSort),
				filteredContacts: action.payload.contacts.sort(ascendingSort),
			};
		case actions.CONTACT_SET_SELECTED:
			return {
				...state,
				seletedContact: action.seletedContact,
			};
		case actions.UPDATE_CONATCTS:
			return {
				...state,
				contacts: action.contacts,
				filteredContacts: action.contacts,
				seletedContact: null,
				searchText: '',
			};
		case actions.SEARCH_CONTACT:
			return {
				...state,
				searchText: action.searchText,
				filteredContacts: filterContacts(state.contacts, action.searchText),
			};

		default:
			return state;
	}
}