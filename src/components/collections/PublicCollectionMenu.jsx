import React from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate } from "react-router-dom";
import BaseAPI from "../../API/BaseAPI";

const PublicCollectionMenu = ({ collectionContent, addToMyCollection }) => {
  const router = useNavigate();
  console.log(collectionContent);

  const back = () => {
    router("/public");
  };

  return (
    <div>
      <h1 className="display-4 mss-4">{collectionContent.name}</h1>

      <div className="d-flex   align-items-start">
        <ButtonGroup aria-label="delete and renaming buttons">
          <Button variant="primary" onClick={addToMyCollection}>
            Add to my collections
          </Button>
          <Button variant="secondary" onClick={back}>
            "❰ Back"
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default PublicCollectionMenu;
