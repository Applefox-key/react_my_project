import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import MyTable from "../../UI/table/MyTable";
import MySpinner from "../../UI/MySpinner";
import PublicCollectionMenu from "./PublicCollectionMenu";
import BaseAPI from "../../../API/BaseAPI";
import { usePopup } from "../../../hooks/usePopup";

const PublicCollectionsView = () => {
  const [content, setContent] = useState();
  const [collection, setCollection] = useState();
  const PageParam = useParams();
  const setPopup = usePopup();
  const [getExpression, isLoading] = useQuery(async () => {
    const cont = await BaseAPI.getPublicCollectionsAndContent(PageParam.id);
    setContent(cont[0].content);
    setCollection(cont[0].collection);
  });

  useEffect(() => {
    getExpression();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PageParam]);

  const addToMyCollection = async () => {
    if (!content) return;
    if (!collection) return;
    await BaseAPI.CreateCollectionWithContent(collection, content, true);
    setPopup.success("the collection has been added to your list");
  };

  return (
    <div className=" w-75 m-auto">
      <PublicCollectionMenu
        collectionContent={PageParam}
        addToMyCollection={addToMyCollection}
      />
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
