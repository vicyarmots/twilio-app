import React, { useState, useCallback, useEffect } from "react";
import Lobby from "./Lobby";
import Room from "./Room";
import { useDispatch } from "react-redux";

//selectors
import { useSelector } from "react-redux";
// user actions

import { setVideoCall } from "./redux/room/middleware";
import { setUserName } from "./redux/user/actions";

const VideoChat = () => {
  const [value, setValue] = useState({
    username: "",
    room: null,
    roomName: "",
    connection: false,
    token: Math.random() * 1000 + "key",
  });

  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  const getRoom = useSelector((state) => state.roomReducer.room);
  const getRoomName = useSelector((state) => state.roomReducer.name);
  const getConnection = useSelector((state) => state.roomReducer.connection);

  console.log(getRoom, getRoomName, getConnection);

  const dispatch = useDispatch();

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setVideoCall(value.username, value.roomName));
  };

  const handleLogout = useCallback(() => {
    setValue((prevRoom) => {
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
    if (value.room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (value.room) {
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
  }, [value.room, handleLogout]);

  let render;
  if (value.room) {
    render = (
      <Room
        roomName={value.roomName}
        room={value.room}
        handleLogout={handleLogout}
      />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
        connecting={value.connection}
      />
    );
  }
  return render;
};

export default VideoChat;
