import React, { useState } from "react";
import CollectionRename from "./CollectionRename";

import NavOneColl from "./NavOneColl";

const CollNameMenu = ({ colObj, setContent }) => {
  const [renameMode, setRenameMode] = useState(false);

  return (
    <div>
      <div className="d-flex  justify-content-center flex-row flex-wrap">
        {renameMode ? (
          <CollectionRename
            collection={colObj.collection}
            cancel={setRenameMode}
          />
        ) : (
          <h1
            className="display-5 ms-4 pe-auto"
            onClick={() => setRenameMode(true)}>
            {colObj.collection.name}
          </h1>
        )}{" "}
      </div>
      <NavOneColl setContent={setContent} colObj={colObj} />
    </div>
  );
};

export default CollNameMenu;
