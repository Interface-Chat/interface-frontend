import React, { useState } from "react";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  Alert,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";

// hooks
import { useRedux } from "../../../hooks/index";

// components
import AudioCallModal from "../../../components/AudioCallModal";
import VideoCallModal from "../../../components/VideoCallModal";
import AddPinnedTabModal from "../../../components/AddPinnedTabModal";

// interface
import { PinTypes } from "../../../data/chat";

// actions
import { changeSelectedChat } from "../../../redux/actions";

// constants
import { STATUS_TYPES } from "../../../constants";
interface ProfileImageProps {
  topic: any;
  chatTopicDetails: any;
  onCloseConversation: () => any;
  // onOpenUserDetails: () => any;
}
const ProfileImage = ({
  topic,
  chatTopicDetails,
  onCloseConversation,
  // onOpenUserDetails,
}: ProfileImageProps) => {
  // const fullName = !isChannel
  //   ? chatUserDetails.firstName
  //     ? `${chatUserDetails.firstName} ${chatUserDetails.lastName}`
  //     : "-"
  //   : chatUserDetails.name;
  
  
  const topicName = chatTopicDetails?.title;
  // console.log(chatTopicDetails);
  
  // const fullName = !isChannel 
  // ? 
  // chatUserDetails.firstName ? `${chatUserDetails.firstName} ${chatUserDetails.lastName}` : "-"
  // : 
  // chatUserDetails.name;
  // const shortName = !isChannel
  // ? chatUserDetails.firstName
  // ? `${chatUserDetails.firstName.charAt(
  //   0
  //   )}${chatUserDetails.lastName.charAt(0)}`
  //   : "-"
  //   : "#";

  

  const colors = [
    "bg-primary",
    "bg-danger",
    "bg-info",
    "bg-warning",
    "bg-secondary",
    "bg-pink",
    "bg-purple",
  ];
  const [color] = useState(Math.floor(Math.random() * colors.length));

  
  return (
    <div className="d-flex align-items-center">
      <div className="flex-shrink-0 d-block d-lg-none me-2">
        <Link
          to="#"
          onClick={onCloseConversation}
          className="user-chat-remove text-muted font-size-24 p-2"
        >
          <i className="bx bx-chevron-left align-middle"></i>
        </Link>
      </div>
      <div className="flex-grow-1 overflow-hidden">
        <div className="d-flex align-items-center">
          <div
            className={classnames(
              "flex-shrink-0",
              "chat-user-img",
              "align-self-center",
              "me-3",
              "ms-0",
              
            )}
          >
            {(
              <div className="avatar-sm align-self-center">
                <span
                  className={classnames(
                    "avatar-title",
                    "rounded-circle",
                    "text-uppercase",
                    "text-white",
                    colors[color]
                  )}
                >
                  <span className="username"> ##</span>
                  <span className="user-status"></span>
                </span>
              </div>
            )}
          </div>
          <div className="flex-grow-1 overflow-hidden">
            <h6 className="text-truncate mb-0 font-size-18">
              <Link
                to="#"
                // onClick={onOpenUserDetails}
                className="user-profile-show text-reset"
              >
                {topic?.title}
              </Link>
            </h6>

          </div>
        </div>
      </div>
    </div>
  );
};

const Search = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        color="none"
        className="btn nav-btn dropdown-toggle"
        type="button"
      >
        <i className="bx bx-search"></i>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-lg">
        <div className="search-box p-2">
          <Input type="text" className="form-control" placeholder="Search.." />
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};
interface MoreProps {
  onOpenAudio: () => void;
  onOpenVideo: () => void;
  onDelete: () => void;
  isArchive: boolean;
}
const More = ({
  onOpenAudio,
  onOpenVideo,
  onDelete,
  isArchive,
}: MoreProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle color="none" className="btn nav-btn" type="button">
        <i className="bx bx-dots-vertical-rounded"></i>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        <DropdownItem
          className="d-flex justify-content-between align-items-center d-lg-none user-profile-show"
          to="#"
        >
          View Profile <i className="bx bx-user text-muted"></i>
        </DropdownItem>
        <DropdownItem
          className="d-flex justify-content-between align-items-center d-lg-none"
          to="#"
          onClick={onOpenAudio}
        >
          Audio <i className="bx bxs-phone-call text-muted"></i>
        </DropdownItem>
        <DropdownItem
          className="d-flex justify-content-between align-items-center d-lg-none"
          to="#"
          onClick={onOpenVideo}
        >
          Video <i className="bx bx-video text-muted"></i>
        </DropdownItem>
        <DropdownItem
          className="d-flex justify-content-between align-items-center"
          to="#"
        >
          Muted <i className="bx bx-microphone-off text-muted"></i>
        </DropdownItem>
        <DropdownItem
          className="d-flex justify-content-between align-items-center"
          to="#"
          onClick={onDelete}
        >
          Delete <i className="bx bx-trash text-muted"></i>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

interface PinnedAlertProps {
  onOpenPinnedTab: () => void;
}

interface UserHeadProps {
  topic: any;
  chatTopicDetails: any;
  
  
}
const UserHead = ({
  topic,
  chatTopicDetails,

  
}: UserHeadProps) => {
  
  // global store
  const { dispatch } = useRedux();
  /*
    video call modal
    */
  const [isOpenVideoModal, setIsOpenVideoModal] = useState<boolean>(false);
  const onOpenVideo = () => {
    setIsOpenVideoModal(true);
  };
  const onCloseVideo = () => {
    setIsOpenVideoModal(false);
  };

  /*
        audio call modal
    */
  const [isOpenAudioModal, setIsOpenAudioModal] = useState<boolean>(false);
  const onOpenAudio = () => {
    setIsOpenAudioModal(true);
  };
  const onCloseAudio = () => {
    setIsOpenAudioModal(false);
  };

  /*
  pinned tab modal
  */
  const [isOpenPinnedTabModal, setIsOpenPinnedTabModal] =
    useState<boolean>(false);
  const onOpenPinnedTab = () => {
    setIsOpenPinnedTabModal(true);
  };
  const onClosePinnedTab = () => {
    setIsOpenPinnedTabModal(false);
  };

  /*
  mobile menu chat conversation close
  */
  const onCloseConversation = () => {
    dispatch(changeSelectedChat(null));
  };

  return (
    <div className="p-3 p-lg-4 user-chat-topbar">
      <Row className="align-items-center">
        <Col sm={4} className="col-8">
          <ProfileImage
          topic={topic}
            chatTopicDetails={chatTopicDetails}
            onCloseConversation={onCloseConversation}
            // onOpenUserDetails={onOpenUserDetails}
            
          />
        </Col>
        <Col sm={8} className="col-4">
          <ul className="list-inline user-chat-nav text-end mb-0">
            <li className="list-inline-item">
              <Search />
            </li>

            <li className="list-inline-item d-none d-lg-inline-block me-2 ms-0">
              <button
                // onClick={onOpenUserDetails}
                type="button"
                className="btn nav-btn user-profile-show"
              >
                <i className="bx bxs-info-circle"></i>
              </button>
            </li>

          </ul>
        </Col>
      </Row>
      {/* <PinnedAlert onOpenPinnedTab={onOpenPinnedTab} /> */}

    </div>
  );
};

export default UserHead;
