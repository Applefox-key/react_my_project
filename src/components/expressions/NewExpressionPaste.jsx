import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ModalPasteList from "./ModalPasteList";

const NewExpressionPaste = ({ setExpressions }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="text-start">
      <ModalPasteList
        setVisible={setVisible}
        visible={visible}
        onClick={setExpressions}
      />

      <OverlayTrigger
        placement={"bottom"}
        overlay={<Tooltip>Add expressions from lists with copy-paste</Tooltip>}>
        <Button
          className="mt-1"
          variant="outline-dark"
          onClick={() => {
            setVisible(true);
          }}>
          Add new expressions from list
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default NewExpressionPaste;
