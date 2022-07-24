import React, { useState, useEffect } from "react";
import { useContext } from "react";
import BaseExtraAPI from "../../API/BaseExtraAPI";
import CollectionCardsList from "./CollectionCardsList";
import MySpinner from "../UI/MySpinner";
import UserAvatar from "../users/UserAvatar";
import { PopupContext } from "../../context";
import { useQuery } from "../../hooks/useQuery";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const { popupSetting, setPopupSettings } = useContext(PopupContext);
  const [getCollections, isLoading] = useQuery(async () => {
    const col = await BaseExtraAPI.getCollections();
    setCollections(col);
  });

  const createCollection = async (name, note) => {
    if (!name) {
      setPopupSettings([
        true,
        "please specify the name of the collection",
        "error",
      ]);
      return;
    }
    await BaseExtraAPI.createCollection(name, note);
    const col = await BaseExtraAPI.getCollections();

    setCollections(col);
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <>
      <div className="d-flex pb-2 justify-content-center mt-4">
        <UserAvatar />

        <div style={{ width: " min-content" }}>
          <h1 className="display-1">Collections </h1>{" "}
          <div className="fs-5">
            create any set of information and memorize with the help of cards
            and other games{" "}
          </div>
        </div>
      </div>

      {isLoading ? (
        <MySpinner />
      ) : (
        <CollectionCardsList
          collectionList={collections}
          createCollection={createCollection}
        />
      )}
    </>
  );
};

export default Collections;
