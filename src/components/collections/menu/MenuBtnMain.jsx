import React from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate } from "react-router-dom";
import BaseExtraAPI from "../../../API/BaseExtraAPI";
import * as ExtAct from "../../../utils/extraActions";

const MenuBtnMain = ({ collection, setContent, setRenameMode }) => {
  const router = useNavigate();
  // const modalShare = () => {
  //   <CollectionShare
  //     visible={true}
  //     setVisible={setDataModal}
  //     setPopup={setPopupSettings}
  //     // collection={{ collection: collectionContent, expressions: expressions }}
  //     collection={{ collectionContent: pageParam, expressions: content }}
  //   />;
  // };
  const removeCollection = async () => {
    if (!window.confirm("Remove this collection?")) return;
    await BaseExtraAPI.deleteColection(collection.id);
    router("/collections");
  };
  const rename = () => {
    setRenameMode(true);
  };
  const deleteAllContent = async () => {
    ExtAct.deleteAllContent(collection.id, setContent);
  };
  const back = () => {
    router("/collections");
  };
  return (
    <div className="d-flex   align-items-start">
      <ButtonGroup aria-label="delete and renaming buttons">
        <Button variant="secondary" onClick={removeCollection}>
          Remove collection
        </Button>
        <Button variant="secondary" onClick={deleteAllContent}>
          Delete all content
        </Button>
        <Button variant="secondary" onClick={rename}>
          Rename collection
        </Button>
        {/* <Button variant="secondary" onClick={props.share}>
              Share the collection
            </Button> */}
        <Button variant="secondary" onClick={back}>
          {"❰ Back"}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default MenuBtnMain;
