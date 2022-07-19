import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import CollectionRename from "../CollectionRename";
import CollectionMenu from "../CollectionMenu";
import MyTable from "./UI/table/MyTable";
import ContentEdit from "../ContentEdit";
import MySpinner from "./UI/MySpinner";
import TabPills from "./UI/TabPills";
import { PopupContext } from "../context";
import CollectionShare from "../CollectionShare";
import * as ExtAct from "../utils/extraActions";
import BaseExtraAPI from "../API/BaseExtraAPI";
import NewContentOne from "./collections/NewContentOne";
import NewContentFile from "./collections/NewContentFile";

const CollectionEdit = () => {
  const [content, setContent] = useState();
  const [dataModal, setDataModal] = useState(false);
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

  //modal content
  const modalRenameCollection = () => {
    setDataModal(
      <CollectionRename
        visible={true}
        setVisible={setDataModal}
        collection={pageParam}
        onClick={rename}
      />
    );
  };

  const modalContentEdit = (expression) => {
    // route(`/collections/play/${pageParam.id}/${newName.trim()}`);
    setDataModal(
      <ContentEdit
        visible={true}
        setVisible={setDataModal}
        content={expression}
        onClick={editContent}
      />
    );
  };

  const modalShare = () => {
    setDataModal(
      <CollectionShare
        visible={true}
        setVisible={setDataModal}
        setPopup={setPopupSettings}
        // collection={{ collection: collectionContent, expressions: expressions }}
        collection={{ collectionContent: pageParam, expressions: content }}
      />
    );
  };
  //actions

  const addContent = async (newC) => {
    ExtAct.addContent(newC, pageParam.id, setContent, setPopupSettings);
  };
  const addContentFromFile = async (contentArr) => {
    ExtAct.addContentFromFile(contentArr, pageParam.id, setContent);
  };
  const contentDelete = async (expression) => {
    ExtAct.contentDelete(expression);
    let arr = content.filter((elem) => elem.id !== expression.id);
    setContent(arr);
  };
  const deleteAllContent = async () => {
    ExtAct.deleteAllContent(pageParam.id, setContent);
  };
  const rename = async (newName) => {
    await BaseExtraAPI.editColName(newName.trim(), pageParam.id);
    setDataModal(false);
    route(`/collections/${pageParam.id}/${newName.trim()}`);
  };

  const editContent = async (expression, newExpression, newPhrase) => {
    if (!expression) return;
    await BaseExtraAPI.editContent(expression.id, newExpression, newPhrase);
    setDataModal(false);
    route(`/collections/${pageParam.id}/${pageParam.name}`);
  };

  return (
    <div>
      {dataModal && dataModal}

      <TabPills
        tabsArr={["Collection menu ", "Add one set", "Add list from File"]}
      >
        <CollectionMenu
          collectionContent={pageParam}
          deleteAllExpressions={deleteAllContent}
          rename={modalRenameCollection}
          share={modalShare}
        />
        <NewContentOne addContent={addContent} />
        <NewContentFile addContent={addContentFromFile} />
      </TabPills>

      {!isLoading ? (
        <MyTable
          dataArray={content}
          namesArray={["side1", "side2", "tag", "id"]}
          btnsArray={[
            { name: "Edit", callback: modalContentEdit },
            { name: "Delete", callback: contentDelete },
          ]}
        />
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default CollectionEdit;
