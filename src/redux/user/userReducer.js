import { SET_USERNAME, SET_USER_TOKEN } from "../types/types";

const initialState = {
  username: "",
  token: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME: {
      return { ...state, username: action.payload };
    }
    case SET_USER_TOKEN: {
      return { ...state, token: action.payload };
    }
    default:
      return state;
  }
};

export default roomReducer;
