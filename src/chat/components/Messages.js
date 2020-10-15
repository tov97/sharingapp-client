import React from "react";
import styled from "styled-components";

const Messages = ({ incomingData }) => {
  return (
    <AllChats>
      {incomingData.map((data) => (
        <ChatMessage superchat={data.superchat}>
          <Avatar src={data.avatar} alt="Thumbnail" />
          <UsernameContainer>
            <UsernameText superchat={data.superchat}>
              {data.username}
            </UsernameText>
            <SuperChatAmount superchat={data.superchat}>
              ${data.amount || null}.00
            </SuperChatAmount>
          </UsernameContainer>
          <ChatText superchat={data.superchat}>{data.message}</ChatText>
        </ChatMessage>
      ))}
    </AllChats>
  );
};

const AllChats = styled.div``;

const ChatMessage = styled.div`
  min-height: ${(props) => (props.superchat ? "112px" : "56px")};
  margin: 8px 8px 0px 4px;
  border-radius: 5px;
  background: ${(props) => (props.superchat ? "goldenrod" : "#242424")};
  @media (max-width: 992px) {
    width: 92%;
  }
  &:hover {
    background: ${(props) => (props.superchat ? "#c1a74f" : "#1e1e1e")};
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  margin: 8px 8px 8px 8px;
  border-radius: 1px;
  z-index: 2;
  cursor: pointer;
  position: absolute;
`;

const UsernameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const UsernameText = styled.p`
  font-family: "Norsebold";
  margin: 15px 8px 0px 55px;
  font-size: 15px;
  color: ${(props) => (props.superchat ? "#242424" : "white")};
  white-space: normal;
`;

const SuperChatAmount = styled.p`
  display: ${(props) => (props.superchat ? "flex" : "none")};
  font-weight: bold;
  font-family: TrajanProThree, serif;
  margin: 18px 0px 0px 5px;
  font-size: 24px;
  color: #242424;
  white-space: normal;
`;

const ChatText = styled.p`
  font-family: "Courier New", Courier, monospace;
  margin: 15px 8px 2px 8px;
  font-size: ${(props) => (props.superchat ? "18px" : "15px")};
  color: ${(props) => (props.superchat ? "#242424" : "white")};
  white-space: normal;
  text-align: left;
  word-break: break-word;
  overflow-wrap: normal;
  word-wrap: normal;
  hyphens: auto;
`;

export default Messages;
