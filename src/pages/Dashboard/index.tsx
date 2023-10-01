import React, { useEffect, useState } from "react";
import classnames from "classnames";

import { Socket, io } from "socket.io-client";
import { SocketProvider } from "./SocketContext";


// hooks
import { useRedux } from "../../hooks/index";

// hooks
import { useConversationUserType } from "../../hooks/index";

// component
import Leftbar from "./Leftbar";
import ConversationUser from "./ConversationUser/index";
import UserProfileDetails from "./UserProfileDetails/index";
import Welcome from "./ConversationUser/Welcome";
import { getTopicDetails } from "../../api";

interface IndexProps {}
const Index = (props: IndexProps) => {
  const socket = io('http://localhost:3001');
  

  // useEffect(() => {
  //   const socketTest = io('http://localhost:3001');
  // socketTest.on('disconnect', () => {
  //   console.log('Disconnected from WebSocket server');
  // });
  // }, []);

  
  
  // global store
  const { useAppSelector } = useRedux();

  const { selectedChat } = useAppSelector(state => ({
    selectedChat: state.Chats.selectedChat,
  }));



  
const [user, setUser] = useState('');
const handleUserChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
  setUser(e.target.value);
};

  return socket ? (
    <SocketProvider socket={socket}>
      <>
    <input
        type="text"
        placeholder="Input UserID"
        value={user}
        onChange={handleUserChange} // Call handleTitleChange on input change
      />
      <Leftbar />
      
      <div
        className={classnames("user-chat", "w-100", "overflow-hidden", {
          "user-chat-show": selectedChat,
        })}
        id="user-chat"
      >
        <div className="user-chat-overlay" id="user-chat-overlay"></div>
        {selectedChat !== null && socket ? (
          <div className="chat-content d-lg-flex">
            <div className="w-100 overflow-hidden position-relative">
              <ConversationUser topicID = {selectedChat}
              user = {user}
              socket = {socket}/>
            </div>
            {/* <UserProfileDetails isChannel={isChannel} /> */}
          </div>
        ) : (
          <Welcome />
        )}
      </div>
    </>
    </SocketProvider>
    
  ): null;
};

export default Index;
