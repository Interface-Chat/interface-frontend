import React from "react";

// interface
import { BasicDetailsTypes } from "../../../data/myProfile";




interface UserDescriptionProps {
  user: any;
  basicDetails: BasicDetailsTypes;
}
const UserDescription = ({ user, basicDetails }: UserDescriptionProps) => {
  return (
    <>


      <div>
        <div className="d-flex py-2">
          <div className="flex-shrink-0 me-3">
            <i className="bx bx-user align-middle text-muted"></i>
          </div>
          <div>User:</div>
          <div className="flex-grow-1 mx-3">
            <p className="mb-0">
              {user?.displayName}
            </p>
          </div>
        </div>

        <div className="d-flex py-2">
          <div className="flex-shrink-0 me-3">
            <i className="bx bx-message-rounded-dots align-middle text-muted"></i>
          </div>
          <div>Email:</div>
          <div className="flex-grow-1 mx-3">
            <p className="mb-0">
              {user?.email ? user.email : "-"}
            </p>
          </div>
        </div>

        <div className="d-flex py-2">
          <div className="flex-shrink-0 me-3">
            <i className="bx bx-location-plus align-middle text-muted"></i>
          </div>
          <div>Tag:</div>
          <div className="flex-grow-1 mx-3">
          {user?.tags.map((tag: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
        <a className="font-size-14 mb-0" key={tag.id}>@{tag.name} </a>
      ))}
           
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDescription;
