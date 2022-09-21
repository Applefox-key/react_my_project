import React from "react";

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
    route(`/collections/my/${collection.id}/${newName.trim()}`);
  };
  return (
    <div className="d-flex">
      <input
        className="display-5 ms-4 border-dark"
        autoFocus
        onBlur={(e) => {
          if (!e.relatedTarget) {
            cancel(false);
          } else if (e.target.parentElement !== e.relatedTarget.parentElement)
            cancel(false);
        }}
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />{" "}
      <Button
        variant="outline-dark"
        size="lg"
        className="mx-2 h-100"
        onClick={() => {
          rename(newName);
        }}>
        OK
      </Button>
      <Button
        className="h-100"
        variant="outline-dark"
        size="lg"
        onClick={(e) => {
          cancel(false);
        }}>
        CANCEL
      </Button>
    </div>
  );
};

export default CollectionRename;
