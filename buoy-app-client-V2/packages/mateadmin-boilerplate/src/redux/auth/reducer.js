import actions from "./actions";

const initState = {
  user: localStorage.getItem('username') !== 'undefined' ? JSON.parse(localStorage.getItem('username')) : null,
  role: localStorage.getItem('role') !== 'undefined' ? JSON.parse(localStorage.getItem('role')) : null, 
  token: localStorage.getItem('token') !== 'undefined' ? JSON.parse(localStorage.getItem('token')) : null, 
  loggedIn : false,
  };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload.user.username,
        role: action.payload.user.role,
        token: action.payload.user.token
      };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
