import React from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate } from "react-router-dom";
import BaseAPI from "../../API/BaseAPI";

const CollectionMenu = ({ collectionContent, DeleteAllWords, Rename }) => {
  const router = useNavigate();

  const RemoveCollection = () => {
    if (!window.confirm("Remove this collection?")) return;
    BaseAPI.deleteColection(collectionContent.id);
    router("/collections");
  };

  return (
    <div>
      <div className="d-flex  justify-content-between">
        <h1 className="display-3">{collectionContent.name}</h1>

        <div className="d-flex   align-items-end">
          <ButtonGroup aria-label="delete and renaming buttons" vertical>
            <Button variant="secondary" onClick={RemoveCollection}>
              Remove collection
            </Button>
            <Button variant="secondary" onClick={DeleteAllWords}>
              Delete all words
            </Button>
            <Button variant="secondary" onClick={Rename}>
              Rename collection
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default CollectionMenu;
