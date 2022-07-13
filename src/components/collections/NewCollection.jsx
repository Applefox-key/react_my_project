import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../UI/input/MyInputGroup";

const NewCollection = ({ addNewCollection }) => {
  const [nameC, setNameC] = useState("");
  return (
    <div className="padding25">
      <MyInputGroup
        text="New collection name:"
        value={nameC}
        onChange={(e) => setNameC(e.target.value)}
      >
        <Button
          variant="outline-dark"
          onClick={() => {
            addNewCollection(nameC);
          }}
        >
          Add new collection
        </Button>
      </MyInputGroup>
    </div>
  );
};

export default NewCollection;
