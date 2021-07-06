import { SET_ROOM, SET_ROOM_NAME, SET_CONNECTION } from "../types/types";

const initialState = {
  name: "",
  room: null,
  connection: false,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOM: {
      return { ...state, room: action.payload };
    }
    case SET_ROOM_NAME: {
      return { ...state, name: action.payload };
    }
    case SET_CONNECTION: {
      return { ...state, connection: action.payload };
    }
    default:
      return state;
  }
};

export default roomReducer;
