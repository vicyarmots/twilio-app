import React, { useState, useCallback, useEffect } from "react";
import Lobby from "./Lobby";
import Room from "./Room";
import { useDispatch } from "react-redux";

//selectors
import { useSelector } from "react-redux";
// user actions
import { setUsername, setUserToken } from "./redux/user/actions";
import { setVideoCall } from "./redux/room/middleware";

const VideoChat = () => {
  const [state, setState] = useState({
    username: "",
    room: null,
    roomName: "",
    connection: false,
    token: Math.random() * 1000 + "key",
  });

  const getRoom = useSelector((state) => state.roomReducer.room);
  const getRoomName = useSelector((state) => state.roomReducer.name);
  const getConnection = useSelector((state) => state.roomReducer.connection);

  console.log(getRoom, getRoomName, getConnection);

  const dispatch = useDispatch();

  // const handleStateChange = useCallback((event) => {
  //   setState(event.target.value);
  // }, []);

  const handleStateChange = (event) => console.log(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setUsername(state.name), setUserToken(state.token));
    dispatch(setVideoCall(state.username, state.roomName));
  };

  const handleLogout = useCallback(() => {
    setState((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (state.room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (state.room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [state.room, handleLogout]);

  let render;
  if (state.room) {
    render = (
      <Room
        roomName={state.roomName}
        room={state.room}
        handleLogout={handleLogout}
      />
    );
  } else {
    render = (
      <Lobby
        username={state.username}
        roomName={state.roomName}
        handleStateChange={handleStateChange}
        handleSubmit={handleSubmit}
        connecting={state.connection}
      />
    );
  }
  return render;
};

export default VideoChat;
