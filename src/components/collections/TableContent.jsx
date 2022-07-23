import React from "react";
import MyTable from "../UI/table/MyTable";
import BaseExtraAPI from "../../API/BaseExtraAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TableContent = ({ content, setContent, col, onRowClick, pageParam }) => {
  const route = useNavigate();
  const [editMode, setEditMode] = useState(null);

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
    await BaseExtraAPI.editContent(
      newV.id,
      newV.question,
      newV.answer,
      newV.note
    );
    setEditMode(null);
    route(`/collections/${pageParam.id}/${pageParam.name}`);
  };

  return (
    <div>
      <MyTable
        onRowClick={onRowClick}
        edit={editMode}
        dataArray={content}
        namesArray={["question", "answer", "note"]}
        btnsArray={[
          { name: "Edit", callback: editOn },
          { name: "Delete", callback: contentDelete },
        ]}
      />
    </div>
  );
};

export default TableContent;
