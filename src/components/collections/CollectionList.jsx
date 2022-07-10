import React, { useState } from "react";
import CollectionCard from "./CollectionCard";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../UI/MyInputGroup";
const CollectionList = ({ collectionList, addNewCollection }) => {
  const [nameC, setNameC] = useState("");

  return (
    <div>
      <div className="padding25">
        <MyInputGroup
          text="New collection name:"
          value={nameC}
          onChange={(e) => setNameC(e.target.value)}
        >
          <Button
            variant="outline-dark"
            onClick={() => {
              addNewCollection(nameC);
            }}
          >
            Add new collection
          </Button>
        </MyInputGroup>
      </div>

      <div className="d-flex p-2 flex-wrap justify-content-center">
        {collectionList.map((item) => (
          <CollectionCard collection={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default CollectionList;
