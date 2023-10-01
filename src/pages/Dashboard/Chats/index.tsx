import React, { useEffect, useState } from "react";

import { Button, Form, Input, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios"; 
// hooks
import { useRedux } from "../../../hooks/index";

// actions
import {
  inviteContact,
  resetContacts,
  getChannels,
  getTopics,
  createChannel,
  changeSelectedChat,
  getChatUserDetails,
  getChatUserConversations,
  getChannelDetails,
  getTopicDetails,
  readConversation,
} from "../../../redux/actions";

// interfaces
import { CreateChannelPostData } from "../../../redux/actions";

// components
import AppSimpleBar from "../../../components/AppSimpleBar";
import AddGroupModal from "../../../components/AddGroupModal";
import InviteContactModal from "../../../components/InviteContactModal";
import AddButton from "../../../components/AddButton";
import ContactModal from "../../../components/ContactModal";

import Favourites from "./Favourites";
import DirectMessages from "./DirectMessages";
import Chanels from "./Chanels";
import Archive from "./Archive";
import { CHATS_TABS } from "../../../constants";
import axios from "axios";

interface IndexProps {}
const Index = (props: IndexProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();
  let user;
  const {
    isContactInvited,
    favourites,
    directMessages,
    topics,
    channels,
    isContactsAdded,
    isChannelCreated,
    selectedChat,
    isFavouriteContactToggled,
    archiveContacts,
    isContactArchiveToggled,
    chatUserDetails,
  } = useAppSelector(state => ({
    isContactInvited: state.Contacts.isContactInvited,
    favourites: state.Chats.favourites,
    directMessages: state.Chats.directMessages,
    topics: state.Chats.topics,
    channels: state.Chats.channels,
    isContactsAdded: state.Chats.isContactsAdded,
    isChannelCreated: state.Chats.isChannelCreated,
    selectedChat: state.Chats.selectedChat,
    isFavouriteContactToggled: state.Chats.isFavouriteContactToggled,
    archiveContacts: state.Chats.archiveContacts,
    isContactArchiveToggled: state.Chats.isContactArchiveToggled,
    chatUserDetails: state.Chats.chatUserDetails,
  }));

  

  const createNewTopic = (data: any) => {
    // Replace 'your_api_endpoint' with the actual URL where you want to send the POST request
    const apiUrl = 'your_api_endpoint';

    // Data to be sent in the POST request
    

    axios
      .post(apiUrl, data)
      .then((response) => {
        // Handle success, e.g., show a success message or redirect
        console.log('Topic created successfully', response.data);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error('Error creating topic', error);
      });
  };

  // let topics;
  /*
  get data
  */
  useEffect(() => {    
    dispatch(getTopics());
    dispatch(getChannels());
  }, [dispatch]);
  useEffect(() => {
    if (isFavouriteContactToggled) {
    }
  }, [dispatch, isFavouriteContactToggled]);

  /*
  invite contact modal handeling
  */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  /*
  onInvite handeling
  */
  const onInviteContact = (data: any) => {
    dispatch(inviteContact(data));
  };
  useEffect(() => {
    if (isContactInvited) {
      setIsOpen(false);
      setTimeout(() => {
        dispatch(resetContacts("isContactInvited", false));
      }, 1000);
    }
  }, [dispatch, isContactInvited]);


  /*
  channel creation handeling
  */
  const [isOpenCreateChannel, setIsOpenCreateChannel] =
    useState<boolean>(false);
  const openCreateChannelModal = () => {
    setIsOpenCreateChannel(true);
  };
  const closeCreateChannelModal = () => {
    setIsOpenCreateChannel(false);
  };
  const onCreateChannel = (channelData: CreateChannelPostData) => {
    dispatch(createChannel(channelData));
  };
  const onCreateTopic = (topicData: any) => {
    
  };

  
  useEffect(() => {
    if (isChannelCreated) {
      setIsOpenCreateChannel(false);
      dispatch(getTopics());
      dispatch(getChannels());
    }
  }, [dispatch, isChannelCreated]);

  /*
  select chat handeling :
    get conversations
    get chat user details
  */

  const onSelectChat = (id: string | number, isChannel?: boolean) => {
    if (isChannel) {
      // dispatch(getChannelDetails(id));
      dispatch(getTopicDetails(id));
    }
    dispatch(readConversation(id));
    dispatch(getChatUserConversations(id));
    dispatch(changeSelectedChat(id));
  };

  /*
  tab handeling
  */
  const [active, setActive] = useState(CHATS_TABS.DEFAULT);
  const onChangeTab = (tab: CHATS_TABS) => {
    setActive(tab);
  };



  //serach recent user
  const searchUsers = () => {
    var li, a, i, txtValue: any;
    const inputValue: any = document.getElementById("serachChatUser");
    const filter: any = inputValue.value.toUpperCase();
    const ul: any = document.querySelector(".chat-room-list");
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
  };

  // useEffect(() => {
  //   // Define your API URL here
  //   const apiUrl = "http://localhost:3001/topics"; // Replace with your actual API URL

  //   // Fetch data from the API
  //   Axios.get(apiUrl)
  //     .then((response) => {
  //       // Assuming the API response contains an array of channels
  //       const fetchedChannels = response;
  //       topics = fetchedChannels;
  //       // channels = fetchedChannels;
  //       console.log(topics);
        
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data from the API:", error);
  //     });
  // }, []);

  return (
    <>
    
      <div>
        <div className="px-4 pt-4">
          <div className="d-flex align-items-start">
            <div className="flex-grow-1">
              <h4 className="mb-4">Chats</h4>
            </div>
            
          </div>
          <Form>
            <div className="input-group mb-3">
              <Input
                onKeyUp={searchUsers}
                id="serachChatUser"
                type="text"
                className="form-control bg-light border-0 pe-0"
                placeholder="Search here.."
              />
              <Button color="light" type="button" id="searchbtn-addon">
                <i className="bx bx-search align-middle"></i>
              </Button>
            </div>
          </Form>
        </div>
        {/* .p-4 */}
        <AppSimpleBar className="chat-room-list">
          {/* Start chat-message-list */}
          {active === CHATS_TABS.DEFAULT && (
            <>

              {/* channels list */}
              <Chanels
              topics={topics}
                channels={channels}
                openCreateChannel={openCreateChannelModal}
                selectedChat={selectedChat}
                onSelectChat={onSelectChat}
              />
              
            </>
          )}

          {/* End chat-message-list */}
        </AppSimpleBar>
      </div>
      {/* add group Modal */}
      {isOpenCreateChannel && (
        <AddGroupModal
          isOpen={isOpenCreateChannel}
          onClose={closeCreateChannelModal}
          onCreateChannel={onCreateChannel}
        />
      )}

      {/* add contact modal */}
      {/* {isOpen && (
        <InviteContactModal
          isOpen={isOpen}
          onClose={closeModal}
          onInvite={onInviteContact}
        />
      )} */}

    </>
  );
};

export default Index;
