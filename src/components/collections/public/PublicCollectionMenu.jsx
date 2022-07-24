import React from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate } from "react-router-dom";

const PublicCollectionMenu = ({ collectionContent, addToMyCollection }) => {
  const router = useNavigate();
  console.log(collectionContent);

  const back = () => {
    router("/collections/pub");
  };

  return (
    <div>
      <h1 className="display-4 mss-4">{collectionContent.name}</h1>
      {/* className="d-flex   align-items-end justify-content-end pt-2" */}
      <div className="d-flex   align-items-start  align-items-end justify-content-end ">
        <ButtonGroup aria-label="delete and renaming buttons" size="lg">
          <Button variant="secondary" onClick={addToMyCollection}>
            Add to my collections
          </Button>
          <Button variant="dark" onClick={back}>
            "❰ Back"
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default PublicCollectionMenu;
