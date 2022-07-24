import React from "react";
import { useState } from "react";
import CollectionRename from "./CollectionRename";
import MenuBtnMain from "./MenuBtnMain";
import MenuBtnSecond from "./MenuBtnSecond";

const CollectionMenu = ({ colObj, ...props }) => {
  const [renameMode, setRenameMode] = useState(false);

  return (
    <div className="d-flex  justify-content-between flex-row flex-wrap">
      {renameMode ? (
        <CollectionRename
          collection={colObj.collection}
          cancel={setRenameMode}
        />
      ) : (
        <h1 className="display-5 ms-4 ">{colObj.collection.name}</h1>
      )}{" "}
      <div className="d-flex  justify-content-end flex-column">
        <MenuBtnMain
          colObj={colObj}
          setContent={props.setContent}
          setRenameMode={setRenameMode}
        />
        <MenuBtnSecond />
      </div>
    </div>
  );
};

export default CollectionMenu;
