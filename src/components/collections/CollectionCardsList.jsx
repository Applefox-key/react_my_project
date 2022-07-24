import React from "react";
import CollectionCard from "./CollectionCard";

import NewCollection from "./NewCollection";
const CollectionCardsList = ({ collectionList, createCollection }) => {
  return (
    <>
      <NewCollection createCollection={createCollection} />

      {!collectionList ? (
        <h2>No collections</h2>
      ) : (
        <div className="d-flex  flex-wrap justify-content-center">
          {collectionList.map((item) => (
            <CollectionCard collection={item} key={item.collection.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default CollectionCardsList;
