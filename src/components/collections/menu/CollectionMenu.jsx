import React from "react";
import { useState } from "react";
import CollectionRename from "./CollectionRename";
import MenuBtnMain from "./MenuBtnMain";
import MenuBtnSecond from "./MenuBtnSecond";

const CollectionMenu = ({ collection, ...props }) => {
  const [renameMode, setRenameMode] = useState(false);

  return (
    <div className="d-flex  justify-content-start flex-row">
      <div className="d-flex  justify-content-start flex-column">
        <MenuBtnMain
          collection={collection}
          setContent={props.setContent}
          setRenameMode={setRenameMode}
        />
        <MenuBtnSecond />
      </div>

      {/* <div className="d-flex  justify-content-center w-80"> */}
      {renameMode ? (
        <CollectionRename collection={collection} cancel={setRenameMode} />
      ) : (
        <h1 className="display-5 ms-4 ">{collection.name}</h1>
      )}
      {/* </div> */}
    </div>
  );
};

export default CollectionMenu;
