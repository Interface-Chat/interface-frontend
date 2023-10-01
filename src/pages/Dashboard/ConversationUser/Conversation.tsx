import React, { useEffect, useRef, useCallback, useState } from "react";

// hooks
import { useRedux } from "../../../hooks/index";

// hooks
import { useProfile } from "../../../hooks";

// components
import AppSimpleBar from "../../../components/AppSimpleBar";
import Loader from "../../../components/Loader";
import Message from "./Message";
// import Day from "./Day";

// interface
import { MessagesTypes } from "../../../data/messages";
import ForwardModal from "../../../components/ForwardModal";


// actions
import { forwardMessage, deleteImage } from "../../../redux/actions";
interface ConversationProps {
  user: any;
  topic: any;
  socket: any;
  onSetReplyData: (reply: null | MessagesTypes | undefined) => void;
}
const Conversation = ({
  user,
  topic,
  socket,
  onSetReplyData,
}: ConversationProps) => {

  // global store
  const { dispatch, useAppSelector } = useRedux();

  

  const { getUserConversationsLoading, isMessageForwarded } = useAppSelector(
    (state: any) => ({
      getUserConversationsLoading: state.Chats.getUserConversationsLoading,
      isMessageForwarded: state.Chats.isMessageForwarded,
    })
  );

  // const messages =
  //   chatUserConversations.messages && chatUserConversations.messages.length
  //     ? chatUserConversations.messages
  //     : [];

  const ref = useRef<any>();
  const scrollElement = useCallback(() => {
    if (ref && ref.current) {
      const listEle = document.getElementById("chat-conversation-list");
      let offsetHeight = 0;
      if (listEle) {
        offsetHeight = listEle.scrollHeight - window.innerHeight + 250;
      }
      if (offsetHeight) {
        ref.current
          .getScrollElement()
          .scrollTo({ top: offsetHeight, behavior: "smooth" });
      }
    }
  }, [ref]);

  let scrollState = true;
  const scrollElement1 = useCallback(() => {
    scrollState = false;
    if (ref && ref.current) {
      const listEle = document.getElementById("chat-conversation-list");
      let offsetHeight = 0;
      if (listEle) {
        offsetHeight = listEle.scrollHeight - window.innerHeight + 250;
      }
      if (offsetHeight) {
        ref.current
          .getScrollElement()
          .scrollTo({ top: offsetHeight, behavior: "auto" }); // Use "auto" instead of "smooth" for immediate scroll
      }
    }
  }, [ref]);


  const scrollToBottom = () => {
    scrollState = false;
    const listEle = document.getElementById("chat-conversation-list");
      let offsetHeight = 0;
      if (listEle) {
        offsetHeight = listEle.scrollHeight - window.innerHeight + 250;
      }
      if (offsetHeight) {
        ref.current
          .getScrollElement()
          .scrollTo({ top: offsetHeight, behavior: "auto" }); // Use "auto" instead of "smooth" for immediate scroll
      }
    // if (ref && ref.current) {
    //   const listEle = document.getElementById("chat-conversation-list");
    //   let offsetHeight = 0;
    //   if (listEle) {
    //     offsetHeight = listEle.scrollHeight - window.innerHeight + 250;
    //   }
    //   if (offsetHeight) {
    //     ref.current
    //       .getScrollElement()
    //       .scrollTo({ top: offsetHeight, behavior: "auto" }); // Use "auto" instead of "smooth" for immediate scroll
    //   }
    // }
  };
  

  //user info (userid)
  const userProfile = user;
  const [messages, setMessages] = useState<any[]>([]);
    

  const handleTopic = () => {
  
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');      
      socket.emit('handleJoinTopic', { topicId: topic.id });
    });


    socket.on('chat', (savedMessage: any) => {
      setMessages(prevMessages => [...prevMessages, savedMessage]);
    });

    socket.on('chatHistory', (chatHistory: any) => {
      setMessages(chatHistory);
    });
  }

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.recalculate();
    }
  }, []);
  useEffect(() => {
    if (messages) {
      scrollElement();
    }
  }, [messages, scrollElement]);


  useEffect(() => {
    handleTopic();
  }, []);
  // useEffect(() => {
  //   if (messages) {
  //     scrollToBottom();
  //   }
  // }, [messages, scrollToBottom]);

  /*
  forward message
  */
  const [forwardData, setForwardData] = useState<
    null | MessagesTypes | undefined
  >();
  const [isOpenForward, setIsOpenForward] = useState<boolean>(false);
  const onOpenForward = (message: MessagesTypes) => {
    setForwardData(message);
    setIsOpenForward(true);
  };
  const onCloseForward = () => {
    setIsOpenForward(false);
  };

  const onForwardMessage = (data: any) => {
    const params = {
      contacts: data.contacts,
      message: data.message,
      forwardedMessage: forwardData,
    };
    dispatch(forwardMessage(params));
  };
  useEffect(() => {
    if (isMessageForwarded) {
      setIsOpenForward(false);
    }
  }, [isMessageForwarded]);

  /*
  image delete
  */
//  console.log(messages);
 
  const onDeleteImage = (
    messageId: string | number,
    imageId: string | number
  ) => {
    // dispatch(deleteImage(chatUserDetails.id, messageId, imageId));
  };

  if(scrollState){
    // console.log("end");
    
    // scrollElement1();
    // scrollToBottom();
  }
  // console.log(scrollState);
  
  // scrollToBottom();
  
  return (
    <AppSimpleBar
      scrollRef={ref}
      className="chat-conversation p-3 p-lg-4 positin-relative"
    >
      {getUserConversationsLoading && <Loader />}
      <ul
        className="list-unstyled chat-conversation-list"
        id="chat-conversation-list"
      >
        {(messages || []).map((message: any, key: number) => {
          const isFromMe = message.user.id + "" === userProfile + "";
          return (
            <Message
              message={message}
              key={key}
              onSetReplyData={onSetReplyData}
              isFromMe={isFromMe}
              onOpenForward={onOpenForward}
              onDeleteImage={onDeleteImage}
            />
          );
        })}
        {/*  <Day /> */}
      </ul>
      {/* {isOpenForward && (
        <ForwardModal
          isOpen={isOpenForward}
          onClose={onCloseForward}
          forwardData={forwardData}
          chatUserDetails={chatUserDetails}
          onForward={onForwardMessage}
        />
      )} */}
    </AppSimpleBar>
  );
};

export default Conversation;
