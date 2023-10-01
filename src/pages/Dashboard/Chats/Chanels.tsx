import React, { useState, useEffect } from "react";
import { UncontrolledTooltip } from "reactstrap";
// Import Axios for making HTTP requests


// components
import AddButton from "../../../components/AddButton";
import ChatChannel from "./ChatChannel";

interface ChanelsProps {
  topics: any;
  channels: Array<any>;
  openCreateChannel: () => void;
  selectedChat: string | number;
  onSelectChat: (id: number | string, isChannel?: boolean) => void;
}


const Chanels = ({
  topics,
  channels,
  openCreateChannel,
  selectedChat,
  onSelectChat,
}: ChanelsProps) => {
  
  


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
          {(topics || []).map((topic: any, key: number) => (
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
