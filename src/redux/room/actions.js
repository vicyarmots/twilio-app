import { SET_ROOM, SET_ROOM_NAME, SET_CONNECTION } from "../types/types";

export const setRoom = (data) => ({ type: SET_ROOM, payload: data });
export const setRoomName = (data) => ({ type: SET_ROOM_NAME, payload: data });
export const setConnection = (data) => ({
  type: SET_CONNECTION,
  payload: data,
});
