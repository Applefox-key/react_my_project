import React from "react";
import MyInputGroup from "../../UI/input/MyInputGroup";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import BaseExtraAPI from "../../../API/BaseExtraAPI";
import { useNavigate } from "react-router-dom";

const CollectionRename = ({ collection, cancel }) => {
  const [newName, setNewName] = useState(collection.name);
  const route = useNavigate();
  const rename = async (newName) => {
    await BaseExtraAPI.editColName(newName.trim(), collection.id);
    cancel(false);
    route(`/collections/${collection.id}/${newName.trim()}`);
  };
  return (
    <div className="d-flex  flex-column align-items-start ">
      <div className="d-flex  justify-content-center align-items-start mb-2">
        <Button
          className="mx-2"
          onClick={() => {
            rename(newName);
          }}
        >
          Rename
        </Button>
        <Button
          onClick={(e) => {
            cancel(false);
          }}
        >
          cancel
        </Button>
      </div>

      <MyInputGroup
        autoFocus
        size="lg"
        label="new name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      ></MyInputGroup>
    </div>
  );
};

export default CollectionRename;
