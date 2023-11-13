import React from "react";
import { Button } from "reactstrap";

// interface
import { BasicDetailsTypes } from "../../../data/settings";

interface PersonalInfoProps {
  user: any;
  basicDetails: BasicDetailsTypes;
}
const PersonalInfo = ({ user, basicDetails }: PersonalInfoProps) => {
  const fullName = basicDetails
    ? `${basicDetails.firstName} ${basicDetails.lastName}`
    : "-";
  return (
    <div className="accordion-body">
      <div className="float-end">
        <Button
          color="none"
          type="button"
          className="btn btn-soft-primary btn-sm"
        >
          <i className="bx bxs-pencil align-middle"></i>
        </Button>
      </div>

      <div>
        <p className="text-muted mb-1">User</p>
        <h5 className="font-size-14">{user?.displayName}</h5>
      </div>

      <div className="mt-4">
        <p className="text mb-1">Email</p>
        <h5 className="font-size-14">
          {user?.email ? user?.email : "-"}
        </h5>
      </div>

      <div className="mt-4">
        <p className="text-muted mb-1">Tag</p>
        
        {user?.tags.map((tag: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
        <a className="font-size-14 mb-0" key={tag.id}>@{tag.name} </a>
      ))}
        
      </div>
    </div>
  );
};

export default PersonalInfo;
