import { useState, useEffect } from "react";
import io from "socket.io-client";
let socket;
export const useChat = () => {
  const [incomingData, setIncomingData] = useState([]);
  const [inputText, setInputText] = useState();

  const sendChatAction = (event, data) => {
    event.preventDefault();
    if (inputText) {
      console.log("Sent:" + data);
      socket.emit("chat message", data);
    }
    setInputText("");
  };

  //establish connection with the socket
  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:5001", {
        path: "/",
      });
    }
  }, []);

  //recieveing message from socket
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setIncomingData((incomingData) => [...incomingData, msg]);
    });
  }, []);

  return { incomingData, sendChatAction, inputText, setInputText };
};
