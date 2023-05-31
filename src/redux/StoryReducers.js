import { ActionTypes } from "./ActionTypes";

const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
    authToken: null,
    picture: null,
    isLoggedIn: false,
  },
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
