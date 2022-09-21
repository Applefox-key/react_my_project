import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import MySpinner from "../UI/MySpinner";

import { PopupContext } from "../../context";
import BaseExtraAPI from "../../API/BaseExtraAPI";

import TableContent from "./TableContent";

import CollNameMenu from "./menu/CollNameMenu";

const OneCollection = () => {
  const [content, setContent] = useState();
  const pageParam = useParams();
  const route = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [getContent, isLoading, error] = useQuery(async () => {
    const colContent = await BaseExtraAPI.getContent(pageParam.id);
    setContent(colContent);
  });

  useEffect(() => {
    getContent();
    if (error) setPopupSettings(true, error, "error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]);

  //actions
  const openCard = (item) => {
    route(`/collections/my/${pageParam.id}/${pageParam.name}/${item.id}`);
  };

  return (
    <div className="mt-">
      <CollNameMenu
        setContent={setContent}
        colObj={{ collection: pageParam, content: content }}
      />

      {!isLoading ? (
        <TableContent
          setContent={setContent}
          content={content}
          onRowClick={openCard}
          pageParam={pageParam}
        />
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default OneCollection;
