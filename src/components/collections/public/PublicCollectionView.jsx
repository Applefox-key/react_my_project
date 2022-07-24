import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import MyTable from "../../UI/table/MyTable";
import MySpinner from "../../UI/MySpinner";
import BaseAPI from "../../../API/BaseAPI";
import { PopupContext } from "../../../context";
import PublicCollectionMenu from "./PublicCollectionMenu";
import BaseExtraAPI from "../../../API/BaseExtraAPI";
import MenuBtnPublic from "./MenuBtnPublic";

const PublicCollectionsView = () => {
  const [content, setContent] = useState();
  const PageParam = useParams();
  const { popupSettings, setPopupSettings } = useContext(PopupContext);

  const [getExpression, isLoading, error] = useQuery(async () => {
    const cont = await BaseExtraAPI.getPublicContent(PageParam.id);
    setContent(cont);
  });

  useEffect(() => {
    getExpression();
  }, [PageParam]);

  const addToMyCollection = async () => {
    if (!content) return;
    if (!PageParam) return;
    const colID = await BaseExtraAPI.createCollection(PageParam.name);
    await BaseExtraAPI.createContentFromArray(content, colID);
    setPopupSettings([
      true,
      "the collection has been added to your list",
      "success",
    ]);
  };

  return (
    <div>
      <PublicCollectionMenu
        collectionContent={PageParam}
        addToMyCollection={addToMyCollection}
      />
      <MenuBtnPublic />
      {!isLoading ? (
        <MyTable
          dataArray={content}
          namesArray={["question", "answer", "note"]}
        />
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default PublicCollectionsView;
