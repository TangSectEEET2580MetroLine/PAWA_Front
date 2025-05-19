import { jwtDecode } from "jwt-decode";

const initialState = {
  username: 'guest',
  role: 'guest',
  token: null
};

const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_PASSENGER: 'SET_PASSENGER'
}

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      let userToken = action.payload.token || action.payload;
      const userDetails = jwtDecode(userToken);
      return {
        username: userDetails.sub,
        role: userDetails.roles[0].authority,
        token: userToken
      }
    case ACTIONS.LOGOUT:
      localStorage.removeItem("token");
      return {
        username: 'guest',
        role: 'guest',
        token: null
      };
    case ACTIONS.SET_PASSENGER:
      return { ...state, passenger: action.payload };
    default:
      return state;
  }
};

export { initialState, authReducer, ACTIONS };