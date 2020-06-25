const actions = {
    GET_BEACHES: 'GET_BEACHES',
    BEACHES_RECEIVED: 'BEACHES_RECEIVED',
    ADD_BEACH_REQUEST: 'ADD_BEACH_REQUEST',

    getBeaches : () => ({
        type: actions.GET_BEACHES
    }),
    
    addBeach: payload => ({
        type: actions.ADD_BEACH_REQUEST,
        payload
    })
};

 export default actions;