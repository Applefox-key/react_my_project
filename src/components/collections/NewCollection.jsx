import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../UI/input/MyInputGroup";

const NewCollection = ({ createCollection, ...props }) => {
  const [nameC, setNameC] = useState("");
  return (
    <div className="d-flex justify-content-center">
      <div className="w-50">
        <MyInputGroup
          size="lg"
          label="New collection name:"
          value={nameC}
          onChange={(e) => setNameC(e.target.value)}>
          <Button
            variant="outline-dark"
            onClick={() => {
              createCollection(nameC);
              setNameC("");
            }}>
            Add new collection
          </Button>
        </MyInputGroup>
      </div>
    </div>
  );
};

export default NewCollection;
