import React, { useEffect, useState } from "react";

import { Collapse, Card, CardBody } from "reactstrap";

// interface
import { MessagesTypes } from "../../../../data/messages";

// hooks
import { useProfile } from "../../../../hooks";

interface ReplyProps {
  reply: null | MessagesTypes | undefined;
  onSetReplyData: (reply: null | MessagesTypes | undefined) => void;
  
}
const Reply = ({ reply, onSetReplyData }: ReplyProps) => {
  /*
  collapse handeling
  */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(false);
    onSetReplyData(null);
  };
  useEffect(() => {
    setIsOpen(reply ? true : false);
  }, [reply]);

  const { userProfile } = useProfile();


  const isReplyFromMe =
    reply && reply.meta.sender + "" === userProfile.uid + "";

  return (
    <Collapse isOpen={isOpen} className="chat-input-collapse replyCollapse">
      <Card className="mb-0">
        <CardBody className="py-3">
          <div className="replymessage-block mb-0 d-flex align-items-start">
            <div className="flex-grow-1">
              <h5 className="conversation-name">
                
              </h5>
              {reply?.text && <p className="mb-0">{reply?.text}</p>}

              {(reply?.image || reply?.attachments) && (
                <p className="mb-0">
                  {reply?.attachments &&
                    !reply?.newimage &&
                    `${reply?.attachments.length} Files`}
                  {reply?.newimage &&
                    !reply?.attachments &&
                    `${reply?.newimage.length} Images`}
                  {reply?.newimage &&
                    reply?.attachments &&
                    `${reply?.attachments.length} Files & ${reply?.newimage.length} Images`}
                </p>
              )}
            </div>
            <div className="flex-shrink-0">
              <button
                type="button"
                className="btn btn-sm btn-link mt-n2 me-n3 font-size-18"
                onClick={onClose}
              >
                <i className="bx bx-x align-middle"></i>
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Collapse>
  );
};

export default Reply;
