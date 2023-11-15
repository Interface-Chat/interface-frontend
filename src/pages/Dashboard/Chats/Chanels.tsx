import React, { useState, useEffect } from "react";
import { UncontrolledTooltip } from "reactstrap";
// Import Axios for making HTTP requests


// components
import AddButton from "../../../components/AddButton";
import ChatChannel from "./ChatChannel";
import { io } from "socket.io-client";

interface ChanelsProps {
  // topics: any;
  channels: Array<any>;
  openCreateChannel: () => void;
  selectedChat: string | number;
  onSelectChat: (id: number | string, isChannel?: boolean) => void;
}


const Chanels = ({
  // topics,
  channels,
  openCreateChannel,
  selectedChat,
  onSelectChat,
}: ChanelsProps) => {

       
  // socket.on('userTopics', (topics: any) => {
  //   console.log('Received user topics:', topics);
  //   setTopic(topics);
  // });

  const accessToken = localStorage.getItem('authUser');
  const tokenObj = accessToken ? JSON.parse(accessToken) : null;

    // console.log(tokenObj.access_token);
    
    
  const [userTopics, setUserTopics] = useState([]);
  const newSocket = io('http://localhost:3001');
  useEffect(() => {
    

    newSocket.on('connect', () => {
      console.log('Connected to the server');
      newSocket.emit('handleUserConnection', { token: tokenObj.access_token });
    });

    newSocket.on('userTopics', (topics) => {
      
      console.log('Received user topics:', topics);
      setUserTopics(topics);
    });

    newSocket.on('error', (errorMessage) => {
      console.error('WebSocket error:', errorMessage);
    });


  }, []);
  useEffect(() => {
    // const newSocket = io('http://localhost:3001', {
    //   query: {
    //     token: tokenObj.access_token,
    //   },
    // });


    newSocket.on('userTopics', (topics) => {
      
      console.log('Received user topics:', topics);
      setUserTopics(topics);
    });

  }, [userTopics]);


  
  


  return (
    <>
      <div className="d-flex align-items-center px-4 mt-5 mb-2">
        <div className="flex-grow-1">
          <h4 className="mb-0 font-size-11 text-muted text-uppercase">
            Topics
          </h4>
        </div>
        <div className="flex-shrink-0">
          <div id="create-group">
            {/* Button trigger modal */}
            <AddButton onClick={openCreateChannel} />{" "}
            {/* addgroup-exampleModal */}
          </div>
          <UncontrolledTooltip target="create-group" placement="bottom">
            Create Topic
          </UncontrolledTooltip>
        </div>
      </div>
      <div className="chat-message-list">
        <ul className="list-unstyled chat-list chat-user-list mb-3">
          {(userTopics || []).map((topic: any, key: number) => (
            <ChatChannel
              channel={topic}
              key={key}
              selectedChat={selectedChat}
              onSelectChat={onSelectChat}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Chanels;
