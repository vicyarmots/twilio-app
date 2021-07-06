import axios from "axios";
import Video from "twilio-video";
import { setConnection, setRoom } from "./actions";

export const setVideoCall = (username, roomName) => async (dispatch) => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify({
        identity: username,
        room: roomName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post("/video/token", options);

    const data = response.JSON();
    console.log(data);
    Video.connect(data.token, {
      name: roomName,
    })
      .then((room) => {
        dispatch(setConnection(false));
        dispatch(setRoom(room));
      })
      .catch((err) => {
        console.error(err);
        dispatch(setConnection(false));
      });
  } catch (error) {
    console.log(error);
  }
};
