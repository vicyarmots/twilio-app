import { SET_USERNAME, SET_USER_TOKEN } from "../types/types";

const setUserName = (data) => ({ type: SET_USERNAME, payload: data });
const setUserToken = (data) => ({ type: SET_USER_TOKEN, payload: data });

export { setUserToken, setUserName };
