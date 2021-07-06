import { combineReducers } from "redux";
import roomReducer from "./room/roomReducer";
import userReducer from "./user/userReducer";
import partcpntReducer from "./participants/partcpntReducer";

const allreducers = combineReducers({
  roomReducer,
  userReducer,
  partcpntReducer,
});

export default allreducers;
