import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import CollectionMenu from "./menu/CollectionMenu";
import MySpinner from "../UI/MySpinner";
import TabPills from "../UI/TabPills";
import { PopupContext } from "../../context";
import BaseExtraAPI from "../../API/BaseExtraAPI";
import NewContentOne from "./NewContentOne";
import NewContentFile from "./NewContentFile";
import TableContent from "./TableContent";
import NewContentPaste from "./NewContentPaste";

const OneCollection = () => {
  const [content, setContent] = useState();
  const pageParam = useParams();
  const route = useNavigate();
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [getContent, isLoading, error] = useQuery(async () => {
    const colContent = await BaseExtraAPI.getContent(pageParam.id);
    setContent(colContent);
  });

  useEffect(() => {
    getContent();
    if (error) setPopupSettings(true, error, "error");
  }, [pageParam]);

  //actions
  const openCard = (item) => {
    route(`/collections/${pageParam.id}/${pageParam.name}/${item.id}`);
  };

  const addContent = async (newC) => {
    if (!newC.question || !newC.answer || !pageParam.id) {
      setPopupSettings([true, "please fill in both fields", "error"]);
      return;
    }
    await BaseExtraAPI.createContent(newC, pageParam.id);
    setContent(await BaseExtraAPI.getContent(pageParam.id));
  };

  return (
    <div className="mt-3">
      <TabPills
        tabsArr={["Collection menu ", "Add one set", "Add several sets"]}>
        <CollectionMenu setContent={setContent} collection={pageParam} />
        <NewContentOne addContent={addContent} />
        <div>
          <NewContentFile setContent={setContent} pageParam={pageParam} />
          <NewContentPaste setContent={setContent} pageParam={pageParam} />
        </div>
      </TabPills>

      {!isLoading ? (
        <TableContent
          setContent={setContent}
          content={content}
          col={pageParam}
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
