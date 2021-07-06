import { SET_PRTCPNT_NAME, SET_PRTCPNT_TOKEN } from "../types/types";

const initialState = {
  name: "",
  token: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRTCPNT_NAME: {
      return { ...state, name: action.payload };
    }
    case SET_PRTCPNT_TOKEN: {
      return { ...state, token: action.payload };
    }
    default:
      return state;
  }
};

export default roomReducer;
