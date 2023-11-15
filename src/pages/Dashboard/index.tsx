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

import axios from "axios";
const apiUrl = 'http://localhost:3001/auth/profile';

interface IndexProps {}
const Index = (props: IndexProps) => {
  // const socket = io('http://localhost:3001');
  
  const token = localStorage.getItem('authUser');
  const socket = io('http://localhost:3001', {
      query: {
        token: token,
      },
    });

  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      
      const tokenObj = token ? JSON.parse(token) : null;

      if (!tokenObj) {
        console.error('No token found in localStorage');
        // Handle the absence of a token, such as redirecting to the login page
      } else {
        const headers = {
          'Authorization': `Bearer ${tokenObj.access_token}`,
          'Content-Type': 'application/json',
        };

        try {
          const response = await axios.get(apiUrl, { headers });
          setUser(response.data);
          console.log('User profile:', response);
        } catch (error) {
          console.error('Error retrieving user profile:', error);
        }
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once


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



  


  return socket ? (
    <SocketProvider socket={socket}>
      <>
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
