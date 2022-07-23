import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ModalPasteContent from "./ModalPasteContent";

const NewContentPaste = ({ setContent, pageParam }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="text-start">
      <ModalPasteContent
        setVisible={setVisible}
        visible={visible}
        onClick={setContent}
        pageParam={pageParam}
      />

      <OverlayTrigger
        placement={"bottom"}
        overlay={<Tooltip>Add new content from lists with copy-paste</Tooltip>}>
        <Button
          size="lg"
          className="mt-1"
          variant="outline-dark"
          onClick={() => {
            setVisible(true);
          }}>
          Add new content from list
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default NewContentPaste;
