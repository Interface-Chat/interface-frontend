import React, { useEffect, useState } from "react";
import classnames from "classnames";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Collapse,
  Form,
} from "reactstrap";

//utils
import { DivideByKeyResultTypes } from "../utils";

// interfaaces
import { ContactTypes } from "../data/contacts";
import { useContacts } from "../hooks";
import { CreateChannelPostData } from "../redux/actions";

// components
import AppSimpleBar from "./AppSimpleBar";
import axios from "axios";

interface DataTypes {
  channelName: string;
  description: string;
  tags: [];
  users: [];
}
interface ContactItemProps {
  data: any;

  selected: boolean;
  onSelectContact: (id: string | number, selected: boolean) => void;
}
interface ContactItemProps1 {
  data: any;

  selected: boolean;
  onSelectContact1: (id: string | number, selected: boolean) => void;
}
const ContactItem = ({
  data,

  selected,
  onSelectContact,
}: ContactItemProps) => {
  // const fullName = `${contact.firstName} ${contact.lastName}`;
  const onCheck = (checked: boolean) => {
    onSelectContact(data.id, checked);
  };

  return (
    <li>
      <div className="form-check">
        <Input
          type="checkbox"
          className="form-check-input"
          id={`contact-${data.id}`}
          onChange={(e: any) => {
            onCheck(e.target.checked)
          }}
          value={data.name}
        />
        <Label className="form-check-label" htmlFor={`contact-${data.id}`}>
          {data.name}
        </Label>
      </div>
    </li>
  );
};
const ContactItem1 = ({
  data,

  selected,
  onSelectContact1,
}: ContactItemProps1) => {
  // const fullName = `${contact.firstName} ${contact.lastName}`;
  const onCheck = (checked: boolean) => {
    onSelectContact1(data.id, checked);
  };

  return (
    <li>
      <div className="form-check">
        <Input
          type="checkbox"
          className="form-check-input"
          id={`contact-${data.id}`}
          onChange={(e: any) => {
            onCheck(e.target.checked)
          }}
          value={data.username}
        />
        <Label className="form-check-label" htmlFor={`contact-${data.id}`}>
          {data.username}
        </Label>
      </div>
    </li>
  );
};

interface CharacterItemProps {

  index: number;
  totalContacts: number;
  selectedContacts: Array<number | string>;
  onSelectContact: (id: string | number, selected: boolean) => void;
  tags: any;
}

const CharacterItem = ({
  index,
  totalContacts,
  selectedContacts,
  onSelectContact,
  tags,
}: CharacterItemProps) => {


  const [searchTerm, setSearchTerm] = useState('');

  const filteredTags = tags.filter((tag: { name: string; }) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (

    <div>
      {/* <input
        type="text"
        placeholder="Search tags"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}
      <div className="input-group mb-3 sticky-top ">
        <Input
          type="text"

          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}

          className="form-control bg-light border-0 pe-0"
          placeholder="Search Tag here..."
        />
        <Button color="light" type="button" id="searchbtn-addon">
          <i className="bx bx-search align-middle"></i>
        </Button>
      </div>

      <ul className="list-unstyled contact-list">
        {filteredTags.map((tag: any) => {
          const selected: boolean = selectedContacts.includes(tag.id);
          return (
            <ContactItem
              data={tag}
              key={tag.id}
              selected={selected}
              onSelectContact={onSelectContact}
            />
          );
        })}
      </ul>
    </div>
  );
};
interface CharacterItemProps1 {

  index: number;
  totalContacts: number;
  selectedContacts: Array<number | string>;
  onSelectContact1: (id: string | number, selected: boolean) => void;
  tags: any;
}

const CharacterItem1 = ({
  index,
  totalContacts,
  selectedContacts,
  onSelectContact1,
  tags,
}: CharacterItemProps1) => {


  const [searchTerm, setSearchTerm] = useState('');

  const filteredTags = tags.filter((tag: { username: string; }) =>
    tag.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (

    <div>
      {/* <input
        type="text"
        placeholder="Search tags"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}
      <div className="input-group mb-3 sticky-top">
        <Input
          type="text"

          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}

          className="form-control bg-light border-0 pe-0"
          placeholder="Search User here..."
        />
        <Button color="light" type="button" id="searchbtn-addon">
          <i className="bx bx-search align-middle"></i>
        </Button>
      </div>

      <ul className="list-unstyled contact-list">
        {filteredTags.map((tag: any) => {
          const selected: boolean = selectedContacts.includes(tag.id);
          return (
            <ContactItem1
              data={tag}
              key={tag.id}
              selected={selected}
              onSelectContact1={onSelectContact1}
            />
          );
        })}
      </ul>
    </div>
  );
};


interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChannel: (params: CreateChannelPostData) => void;
}
const AddGroupModal = ({
  isOpen,
  onClose,
  onCreateChannel,
}: AddGroupModalProps) => {
  /*
    collapse handeling
    */
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);
  const toggleCollapse = () => {
    setIsOpenCollapse(!isOpenCollapse);
  };
  const [isOpenCollapse1, setIsOpenCollapse1] = useState(false);
  const toggleCollapse1 = () => {
    setIsOpenCollapse1(!isOpenCollapse1);
  };

  /*
    contacts hook
    */
  const { categorizedContacts, totalContacts } = useContacts();






  /*
  select contacts
  */
  const [selectedContacts, setSelectedContacts] = useState<
    Array<string | number>
  >([]);
  const onSelectContact = (id: string | number, selected: boolean) => {
    let modifiedList: Array<string | number> = [...selectedContacts];
    if (selected) {
      modifiedList = [...modifiedList, id];
    } else {
      modifiedList = modifiedList.filter(m => m + "" !== id + "");
    }
    setSelectedContacts(modifiedList);
  };
  /*
  select users
  */
  const [selectedContacts1, setSelectedContacts1] = useState<
    Array<string | number>
  >([]);
  const onSelectContact1 = (id: string | number, selected: boolean) => {
    let modifiedList: Array<string | number> = [...selectedContacts1];
    if (selected) {
      modifiedList = [...modifiedList, id];
    } else {
      modifiedList = modifiedList.filter(m => m + "" !== id + "");
    }
    setSelectedContacts1(modifiedList);
  };

  /*
    data
    */
  const [data, setData] = useState<DataTypes>({
    channelName: "",
    description: "",
    tags: [],
    users: [],
  });
  const onDataChange = (field: "tags" | "users" | "channelName" | "description", value: any) => {
    let modifiedData: DataTypes = { ...data };
    modifiedData[field] = value;
    setData(modifiedData);
  };

  /*
    disale button
    */
  const [valid, setValid] = useState(false);
  useEffect(() => {
    if (
      selectedContacts.length === 0 &&
      selectedContacts1.length === 0 &&
      !data.description &&
      data.description === ""
    ) {
      setValid(false);
    } else if (data.channelName === ""){
      setValid(false);
    }
     else {
      setValid(true);
    }
  }, [selectedContacts, selectedContacts1, data]);

  /*
    submit data
    */
  const onSubmit = async () => {
    const params = {
      title: data.channelName,
      tags: selectedContacts,
      users: selectedContacts1,
      description: data.description,
    };

    console.log(params);

    

    try {
      const token = localStorage.getItem('authUser');
      const tokenObj = token ? JSON.parse(token) : null;
      // Assuming your backend API is running at http://localhost:3000
      const response = await axios.post('http://localhost:3001/topics/user-create', params, {
  headers: {
    'Authorization': `Bearer ${tokenObj.access_token}`,
    // Other headers if needed
  },
});
      
    } catch (error) {
      console.error('Error creating topic:', error);
      // Handle error as needed, e.g., show an error message to the user
    }
    

    // onCreateChannel(params);
  };

  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tags');
        console.log(response.data);

        setTags(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/list');
        console.log(response.data);

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);
  useEffect(() => {
    console.log(tags);
  }, [tags]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      tabIndex={-1}
      centered
      scrollable
      id="addgroup-exampleModal"
      role="dialog"
    >
      <ModalHeader className="modal-title-custom" toggle={onClose}>
        Create New Topic
      </ModalHeader>

      <ModalBody className="p-4">
        <Form>
          <div className="mb-4">
            <Label htmlFor="addgroupname-input" className="form-label">
              Topic Title
            </Label>
            <Input
              type="text"
              className="form-control"
              id="addgroupname-input"
              placeholder="Enter Topic Title"
              value={data.channelName || ""}
              onChange={(e: any) => {
                onDataChange("channelName", e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Topic Tags</label>
            <div className="mb-3">
              <Button
                color="light"
                size="sm"
                type="button"
                onClick={toggleCollapse}
              >
                Select Tags
              </Button>
            </div>
            <Collapse isOpen={isOpenCollapse} id="groupmembercollapse">
              <div className="card border">
                <div className="card-header">
                  <h5 className="font-size-15 mb-0">Tags</h5>
                </div>
                <div className="card-body p-2">
                  <AppSimpleBar style={{ maxHeight: "150px" }}>
                    {
                      <CharacterItem
                        index={1}
                        tags={tags}



                        totalContacts={totalContacts}
                        selectedContacts={selectedContacts}
                        onSelectContact={onSelectContact}
                      />

                    }
                  </AppSimpleBar>
                </div>
              </div>
            </Collapse>


            <label className="form-label">Topic Members</label>
            <div className="mb-3">
              <Button
                color="light"
                size="sm"
                type="button"
                onClick={toggleCollapse1}
              >
                Select Members
              </Button>
            </div>

            <Collapse isOpen={isOpenCollapse1} id="groupmembercollapse">
              <div className="card border">
                <div className="card-header">
                  <h5 className="font-size-15 mb-0">Contacts</h5>
                </div>
                <div className="card-body p-2">
                  <AppSimpleBar style={{ maxHeight: "150px" }}>
                    {
                      <CharacterItem1
                        index={2}
                        tags={users}



                        totalContacts={totalContacts}
                        selectedContacts={selectedContacts}
                        onSelectContact1={onSelectContact1}
                      />

                    }
                  </AppSimpleBar>
                </div>
              </div>
            </Collapse>
          </div>
          <div className="mb-3">
            <Label htmlFor="addgroupdescription-input" className="form-label">
              Description
            </Label>
            <textarea
              className="form-control"
              id="addgroupdescription-input"
              rows={3}
              placeholder="Enter Description"
              value={data.description || ""}
              onChange={(e: any) => {
                onDataChange("description", e.target.value);
              }}
            />
          </div>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="link" type="button" onClick={onClose}>
          Close
        </Button>
        <Button
          type="button"
          color="primary"
          onClick={onSubmit}
          disabled={!valid}
        >
          Create Topic
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddGroupModal;
