import React, { useEffect, useState } from "react";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import userIcon from "../../../assets/icons/User_icon_2.svg.webp"
// interface
import { BasicDetailsTypes } from "../../../data/myProfile";

interface User {
  roles: any;
  displayName: string;
  // Add other properties as needed
}
interface MyProfileProps {
  user: User;
  basicDetails: BasicDetailsTypes;
}
const MyProfile = ({ user, basicDetails }: MyProfileProps) => {


  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const fullName = basicDetails
    ? `${basicDetails.firstName} ${basicDetails.lastName}`
    : "-";
  return (
    <>
      <div className="user-profile-img">
        {basicDetails && basicDetails.coverImage && (
          <div
            // src=""
            // alt=""
            className="profile-img"
            style={{ height: "160px" }}
          />
        )}

        <div className="overlay-content">
          <div>
            <div className="user-chat-nav p-2 ps-3">
              <div className="d-flex w-100 align-items-center">
                <div className="flex-grow-1">
                  <h5 className="text-white mb-0">My Profile</h5>
                </div>
                <div className="flex-shrink-0">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle
                      color="none"
                      className="btn nav-btn text-white"
                      type="button"
                    >
                      <i className="bx bx-dots-vertical-rounded"></i>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      <DropdownItem
                        className="d-flex align-items-center justify-content-between"
                        href="#"
                      >
                        Help{" "}
                        <i className="bx bx-help-circle ms-2 text-muted"></i>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center p-3 p-lg-4 border-bottom pt-2 pt-lg-2 mt-n5 position-relative">
        <div className="mb-lg-3 mb-2">
          {basicDetails && basicDetails.coverImage && (
            <img
              src={userIcon}
              alt="profile"
              className="rounded-circle avatar-lg img-thumbnail"
              
            />
          )}
        </div>

        <h5 className="font-size-16 mb-1 text-truncate">{user?.displayName}</h5>
        <p className="text-muted font-size-14 text-truncate mb-0">
          {user?.roles?.name}
        </p>
      </div>
    </>
  );
};
export default MyProfile;
