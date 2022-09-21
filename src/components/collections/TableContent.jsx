import React, { useContext } from "react";
import MyTable from "../UI/table/MyTable";
import BaseExtraAPI from "../../API/BaseExtraAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PopupContext } from "../../context";

const TableContent = ({ content, setContent, onRowClick, pageParam }) => {
  // eslint-disable-next-line no-unused-vars
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const route = useNavigate();
  const [editMode, setEditMode] = useState(null);

  const deleteAllContent = async () => {
    if (!window.confirm("Delete all expressions?")) return;
    await BaseExtraAPI.deleteColContent(pageParam.id);
    setContent([]);
  };
  const addRow = async () => {
    if (editMode) return;
    const newEl = {
      id: "new",
      collectionid: pageParam.id,
      question: "",
      answer: "",
      note: "",
    };
    // await BaseExtraAPI.deleteColContent(pageParam.id);
    setContent([newEl, ...content]);
    editOn(newEl);
  };

  const addContent = async (newC) => {
    if (!newC.question || !newC.answer || !pageParam.id) {
      // setPopupSettings([true, "please fill in both fields", "error"]);
      return;
    }
    await BaseExtraAPI.createContent(newC, pageParam.id);
    setEditMode(null);
    setContent(await BaseExtraAPI.getContent(pageParam.id));
    setPopupSettings([true, "content was added", "success"]);
  };
  const editOn = (content) => {
    setEditMode({
      content: content,
      names: ["question", "answer", "note"],
      edit: contentEdit,
    });
  };
  const contentDelete = async (element) => {
    if (!window.confirm("Delete the expression?")) return;
    await BaseExtraAPI.deleteContent(element.id);
    let arr = content.filter((elem) => elem.id !== element.id);
    setContent(arr);
  };
  const contentEdit = async (newV) => {
    if (!newV) {
      setEditMode(null);
      return;
    }

    if (newV === "newCancel") {
      setEditMode(null);

      setContent(content.filter((el) => el.id !== "new"));
      return;
    }
    if (newV.id === "new") {
      addContent(newV);
      return;
    }
    await BaseExtraAPI.editContent(
      newV.id,
      newV.question,
      newV.answer,
      newV.note
    );
    setEditMode(null);
    route(`/collections/my/${pageParam.id}/${pageParam.name}`);
  };

  return (
    <div>
      <MyTable
        onRowClick={onRowClick}
        edit={editMode}
        dataArray={content}
        namesArray={["question", "answer", "note"]}
        btnsArray={[
          { nameMain: "Add row", callback: addRow },
          { nameMain: "Delete all", callback: deleteAllContent },
          { name: "Edit", callback: editOn },
          { name: "Delete", callback: contentDelete },
        ]}
      />
    </div>
  );
};

export default TableContent;
