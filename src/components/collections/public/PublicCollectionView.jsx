import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import MyTable from "../../UI/table/MyTable";
import MySpinner from "../../UI/MySpinner";
import BaseAPI from "../../../API/BaseAPI";
import { PopupContext } from "../../../context";
import PublicCollectionMenu from "./PublicCollectionMenu";

const PublicCollectionsView = () => {
  const [expressions, setExpressions] = useState();
  const collectionContent = useParams();
  const { popupSettings, setPopupSettings } = useContext(PopupContext);

  const [getExpression, isLoading, error] = useQuery(async () => {
    const expressions = await BaseAPI.getPublicExpressionsByCollection(
      collectionContent.id
    );
    setExpressions(expressions);
  });

  useEffect(() => {
    getExpression();
  }, [collectionContent]);

  const addToMyCollection = async () => {
    if (!expressions) return;
    if (!collectionContent) return;
    const colID = await BaseAPI.createCollection(collectionContent.name);
    await BaseAPI.createExpressionFromArray(expressions, colID);
    setPopupSettings([
      true,
      "the collection has been added to your list",
      "success",
    ]);
  };

  return (
    <div>
      <PublicCollectionMenu
        collectionContent={collectionContent}
        addToMyCollection={addToMyCollection}
      />

      {!isLoading ? (
        <MyTable
          dataArray={expressions}
          namesArray={["expression", "phrase"]}
        />
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default PublicCollectionsView;
