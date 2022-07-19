import React from "react";
import CollectionCard from "./CollectionCard";

import NewCollection from "./NewCollection";
const CollectionList = ({ collectionList, createCollection }) => {
  return (
    <div>
      <NewCollection createCollection={createCollection} />
      {!collectionList ? (
        <h2>No collections</h2>
      ) : (
        <div className="d-flex p-2 flex-wrap justify-content-center">
          {collectionList.map((item) => (
            <CollectionCard collection={item} key={item.collection.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionList;
