import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Button from "../../shared/components/FormElements/Button";
import Avatar from "../../shared/components/UIElement/Avatar";
import Messages from "../components/Messages";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useChat } from "../../shared/hooks/chat-hook";
// import { CTX } from "../../shared/context/chat-context";
const LiveChat = () => {
  const auth = useContext(AuthContext);
  // const { allChats, sendChatAction } = useContext(CTX);
  // const channels = Object.keys(allChats);

  const { incomingData, sendChatAction, inputText, setInputText } = useChat();

  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  // const userById = async (props) =>{
  //   const user = await props.find(user =>{
  //     return props.id === user.id
  //   })
  //   return user;
  // }

  return (
    <ChatWindow>
      <ChatHeader>Chat</ChatHeader>
      <ChatView>
        {/* src={`${process.env.REACT_APP_ASSET_URL}/${loadedUsers[0].image}`} */}

        <Messages incomingData={incomingData} />
      </ChatView>
      <ChatInput>
        <input value={inputText} onChange={(event) => handleInput(event)} />
        <ChatCharacters> 0 / 100 </ChatCharacters>
        <Button
          type="submit"
          onClick={(event) =>
            sendChatAction(event, {
              userId: auth.userId,
              username: auth.name,
              message: inputText,
            })
          }
        >
          Send
        </Button>
      </ChatInput>
    </ChatWindow>
  );
};

const ChatWindow = styled.div`
  position: relative;
  margin-left: 25%;
  margin-right: 25%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: 1rem;
  overflow: hidden;
  background: white;
  height: 600px;
`;
const ChatHeader = styled.header`
  align-items: center;
  justify-content: center;
`;
const ChatView = styled.div`
  height: 80%;
`;
const ChatInput = styled.div`
  display: flex;
`;
const ChatCharacters = styled.p`
  margin-left: 15px;
  margin-right: 15px;
`;

export default LiveChat;
