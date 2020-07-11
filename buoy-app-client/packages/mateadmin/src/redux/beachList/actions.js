const actions = {
    GET_BEACHES: 'GET_BEACHES',
    BEACHES_RECEIVED: 'BEACHES_RECEIVED',
    ADD_BEACH_REQUEST: 'ADD_BEACH_REQUEST',
    BEACH_ADDED: 'BEACH_ADDED',
    SEARCH_BEACH: 'SEARCH_BEACH',

    getBeaches : () => ({
        type: actions.GET_BEACHES
    }),
    
    addBeach: payload => ({
        type: actions.ADD_BEACH_REQUEST,
        payload
    }),

    setSearch: searchText => ({
        type: actions.SEARCH_BEACH,
        searchText
    }),

};

 export default actions;