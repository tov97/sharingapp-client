import React, { useReducer } from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

const initialState = {
  channel: {
    warRoom: [
      {
        userId: "5f75e86dfb44bda00e55f0e8",
        from: "Trevor Tovsen",
        msg: "An initial message",
      },
      {
        userId: "5f74a46a49c33d22703f4ae0",
        from: "Chester Dew",
        msg: "Greets",
      },
      {
        userId: "5f75e88efb44bda00e55f0e9",
        from: "Lorrell Appleton",
        msg: "Not a chance",
      },
    ],

    proudBoys: [
      { userId: "5f75e86dfb44bda00e55f0e8", from: "tt123", msg: "Yo" },
      {
        userId: "5f74a46a49c33d22703f4ae0",
        from: "anotherUser2",
        msg: "there's 2 times",
      },
      {
        userId: "5f75e88efb44bda00e55f0e9",
        from: "Timothy McHerrington",
        msg: "Good day sir",
      },
    ],
  },
};

function reducer(state, action) {
  const { userId, from, msg, channel } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        channel: {
          ...state.channel,
          channel: [...state[channel], userId, from, msg],
        },
      };

    default:
      return state;
  }
}

let socket;
const sendChatAction = (value) => {
  console.log("Sent:" + value);
  socket.emit("chat message", value);
};

const ChatContext = (props) => {
  const [allChats, dispatch] = useReducer(reducer, initialState);
  if (!socket) {
    socket = io("http://localhost:5001", {
      path: "/",
    });
  }
  socket.on("chat message", (msg) => {
    dispatch({ type: "RECEIVE_MESSAGE", payload: msg });

    console.log("Received:" + msg);
  });
  return (
    <CTX.Provider value={{ allChats, sendChatAction }}>
      {props.children}
    </CTX.Provider>
  );
};
export default ChatContext;
