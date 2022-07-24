import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate } from "react-router-dom";
import BaseExtraAPI from "../../../API/BaseExtraAPI";
import CollectionShare from "./CollectionShare";
import MenuBtnSecond from "./MenuBtnSecond";

const MenuBtnMain = ({ colObj, setContent, setRenameMode }) => {
  const [visible, setVisible] = useState(false);
  const router = useNavigate();

  const modalShare = () => {
    setVisible(true);
  };
  const removeCollection = async () => {
    if (!window.confirm("Remove this collection?")) return;
    await BaseExtraAPI.deleteColection(colObj.collection.id);
    router("/collections/my");
  };
  const rename = () => {
    setRenameMode(true);
  };
  const deleteAllContent = async () => {
    if (!window.confirm("Delete all expressions?")) return;
    await BaseExtraAPI.deleteColContent(colObj.collection.id);
    setContent([]);
  };
  const back = () => {
    router("/collections/my");
  };
  return (
    <div className="d-flex   align-items-start p-2">
      {visible && (
        <CollectionShare
          setVisible={setVisible}
          colObj={colObj}
          visible={visible}
        />
      )}

      <ButtonGroup size="lg" aria-label="delete and renaming buttons">
        <Button variant="secondary" onClick={removeCollection}>
          Remove collection
        </Button>
        <Button variant="secondary" onClick={deleteAllContent}>
          Delete all content
        </Button>
        <Button variant="secondary" onClick={modalShare}>
          Share collection
        </Button>
        <Button variant="secondary" onClick={rename}>
          Rename collection
        </Button>
        {/* <Button variant="secondary" onClick={props.share}>
              Share the collection
            </Button> */}
        <Button variant="dark" onClick={back}>
          {"❰ Back"}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default MenuBtnMain;
