import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";

import CollectionMenu from "../menu/CollectionMenu";

import MySpinner from "../../UI/MySpinner";
import TabPills from "../../UI/TabPills";
import { PopupContext } from "../../../context";

import * as ExtAct from "../../../utils/extraActions";
import BaseExtraAPI from "../../../API/BaseExtraAPI";
import NewContentOne from "../NewContentOne";
import NewContentFile from "../NewContentFile";
import TableContent from "./TableContent";

const CollectionEdit = () => {
  const [content, setContent] = useState();
  // const [dataModal, setDataModal] = useState(false);
  const pageParam = useParams();
  const route = useNavigate();
  const { popupSettings, setPopupSettings } = useContext(PopupContext);

  const [getContent, isLoading, error] = useQuery(async () => {
    const colContent = await BaseExtraAPI.getContent(pageParam.id);
    setContent(colContent);
  });

  useEffect(() => {
    getContent();
  }, [pageParam]);

  //actions
  const openCard = (item) => {
    route(`/collections/${pageParam.id}/${pageParam.name}/${item.id}`);
  };
  const addContent = async (newC) => {
    ExtAct.addContent(newC, pageParam.id, setContent, setPopupSettings);
  };
  const addContentFromFile = async (contentArr) => {
    ExtAct.addContentFromFile(contentArr, pageParam.id, setContent);
  };

  return (
    <div>
      <TabPills
        tabsArr={["Collection menu ", "Add one set", "Add list from File"]}
      >
        <CollectionMenu setContent={setContent} collection={pageParam} />
        <NewContentOne addContent={addContent} />
        <NewContentFile addContent={addContentFromFile} />
      </TabPills>

      {!isLoading ? (
        <TableContent
          setContent={setContent}
          content={content}
          pageParam={pageParam}
          onRowClick={openCard}
        />
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default CollectionEdit;
