import React from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate } from "react-router-dom";
import BaseAPI from "../../API/BaseAPI";

const CollectionMenu = ({ collectionContent, deleteAllWords, rename }) => {
  const router = useNavigate();

  const removeCollection = () => {
    if (!window.confirm("Remove this collection?")) return;
    BaseAPI.deleteColection(collectionContent.id);
    router("/collections");
  };

  const back = () => {
    router("/collections");
  };
  return (
    <div>
      <div className="d-flex  justify-content-start flex-column">
        <div className="d-flex   align-items-start">
          <ButtonGroup aria-label="delete and renaming buttons">
            <Button variant="secondary" onClick={removeCollection}>
              Remove collection
            </Button>
            <Button variant="secondary" onClick={deleteAllWords}>
              Delete all words
            </Button>
            <Button variant="secondary" onClick={rename}>
              Rename collection
            </Button>
            <Button variant="secondary" onClick={back}>
              {"❰ Back"}
            </Button>
          </ButtonGroup>
        </div>
        <div className="d-flex  justify-content-end">
          <h1 className="display-4 ms-4">{collectionContent.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default CollectionMenu;
