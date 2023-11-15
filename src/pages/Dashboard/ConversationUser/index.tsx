import React, { useEffect, useState } from "react";

// hooks
import { useRedux } from "../../../hooks/index";

// actions
import {
  toggleUserDetailsTab,
  getChatUserConversations,
  onSendMessage,
  receiveMessage,
  readMessage,
  receiveMessageFromUser,
  deleteMessage,
  deleteUserMessages,
} from "../../../redux/actions";

// hooks
import { useProfile } from "../../../hooks";

// components
import UserHead from "./UserHead";
import Conversation from "./Conversation";
import ChatInputSection from "./ChatInputSection/index";

// interface
import { MessagesTypes } from "../../../data/messages";

// dummy data
import { pinnedTabs } from "../../../data/index";
import axios from "axios";

interface IndexProps {
  topicID: any;
  user: any;
  socket: any;
  // isChannel: boolean;
}
const Index = ({
  topicID,
  user,
  socket,
}: IndexProps) => {
  // const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<any[]>([]);


  const [topic, setTopic] = useState<any>(null);

  useEffect(() => {

    // Make a GET request
    axios.get(`http://localhost:3001/topics/${topicID}`)
      .then((response) => {
        // Handle the successful response here
        // console.log(response);

        setTopic(response);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error fetching data:', error);
      });
  }, []);



  const sendMessage = (text: any) => {
    if (socket && text.trim() !== '') {
      const messageData = {
        topic: topic.id, // Replace with the actual topic
        id: user.id, // Replace with the actual username
        message: text,
      };
      console.log(messageData);
      
      socket.emit('handleChatMessages', messageData);
      // setInputMessage('');
    }
  };

  // console.log(topic);



  // global store
  const { useAppSelector } = useRedux();

  const {
    chatTopicDetails,
    chatUserConversations,
    isUserMessageSent,
    isMessageDeleted,
    isMessageForwarded,
    isUserMessagesDeleted,
    isImageDeleted,
  } = useAppSelector(state => ({
    chatTopicDetails: state.Chats.topicDetails,
    chatUserConversations: state.Chats.chatUserConversations,
    isUserMessageSent: state.Chats.isUserMessageSent,
    isMessageDeleted: state.Chats.isMessageDeleted,
    isMessageForwarded: state.Chats.isMessageForwarded,
    isUserMessagesDeleted: state.Chats.isUserMessagesDeleted,
    isImageDeleted: state.Chats.isImageDeleted,
  }));
  // console.log(chatUserDetails);
  // console.log(chatTopicDetails);

  // const onOpenUserDetails = () => {
  //   dispatch(toggleUserDetailsTab(true));
  // };

  /*
  hooks
  */
  // const { userProfile } = useProfile();

  /*
  reply handeling
  */
  const [replyData, setReplyData] = useState<
    null | MessagesTypes | undefined
  >();
  const onSetReplyData = (reply: null | MessagesTypes | undefined) => {
    setReplyData(reply);
  };

  /*
  send message
  */
  const onSend = (data: any) => {
    let params: any = {
      text: data.text && data.text,
      time: new Date().toISOString(),
      image: data.image && data.image,
      newimage: data.newimage && data.newimage,
      attachments: data.attachments && data.attachments,

    };

    if (replyData && replyData !== null) {
      params["replyOf"] = replyData;
    }
    // console.log(params.text);
    sendMessage(params.text)

    // dispatch(onSendMessage(params));
    setReplyData(null);
  };


  useEffect(() => {
    if (
      isUserMessageSent ||
      isMessageDeleted ||
      isMessageForwarded ||
      isUserMessagesDeleted ||
      isImageDeleted
    ) {
      // dispatch(getChatUserConversations(chatTopicDetails.id));
    }
  }, [
    // dispatch,
    isUserMessageSent,
    isMessageDeleted,
    isMessageForwarded,
    isUserMessagesDeleted,
    isImageDeleted,
  ]);

  // const onDeleteMessage = (messageId: string | number) => {
  //   dispatch(deleteMessage(chatTopicDetails.id, messageId));
  // };

  // const onDeleteUserMessages = () => {
  //   dispatch(deleteUserMessages(chatTopicDetails.id));
  // };


  return (
    <>
      {topic !== null ? ( // Conditionally render UserHead when topic is not null
        <>
          <UserHead
            topic={topic}
            chatTopicDetails={chatTopicDetails}
          />
          <Conversation
            topic={topic}
            user={user}
            socket={socket}
            onSetReplyData={onSetReplyData} 
          />
          <ChatInputSection
            onSend={onSend}
          />
        </>
      ) : (
        // You can show a loading indicator or message here while waiting for the response
        <div>Loading...</div>
      )}

    </>
  );
};

export default Index;
