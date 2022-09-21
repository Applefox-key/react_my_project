import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import MyTable from "../../UI/table/MyTable";
import MySpinner from "../../UI/MySpinner";

import { PopupContext } from "../../../context";
import PublicCollectionMenu from "./PublicCollectionMenu";
import BaseExtraAPI from "../../../API/BaseExtraAPI";

const PublicCollectionsView = () => {
  const [content, setContent] = useState();
  const PageParam = useParams();
  // eslint-disable-next-line no-unused-vars
  const { popupSettings, setPopupSettings } = useContext(PopupContext);

  // eslint-disable-next-line no-unused-vars
  const [getExpression, isLoading, error] = useQuery(async () => {
    const cont = await BaseExtraAPI.getPublicContent(PageParam.id);
    setContent(cont);
  });

  useEffect(() => {
    getExpression();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* <MenuBtnPublic /> */}
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
