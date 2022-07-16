import React from "react";
import MyModal from "../UI/MyModal";
import MyInputGroup from "../UI/input/MyInputGroup";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";

const CollectionRename = ({ visible, setVisible, collection, onClick }) => {
  const [newName, setNewName] = useState("");

  return (
    <MyModal visible={visible} setVisible={setVisible} title={collection.name}>
      <MyInputGroup
        label="new name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      >
        <Button
          onClick={() => {
            onClick(newName);
          }}
        >
          Rename
        </Button>
      </MyInputGroup>
    </MyModal>
  );
};

export default CollectionRename;
