import React from "react";
import MyTable from "../../UI/table/MyTable";
import * as ExtAct from "../../../utils/extraActions";
import BaseExtraAPI from "../../../API/BaseExtraAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TableContent = ({ content, setContent, pageParam, onRowClick }) => {
  const route = useNavigate();
  const [editMode, setEditMode] = useState(null);

  const editOn = (content) => {
    setEditMode({
      content: content,
      names: ["side1", "side2", "tag"],
      edit: contentEdit,
    });
  };

  const contentDelete = async (element) => {
    ExtAct.contentDelete(element);
    let arr = content.filter((elem) => elem.id !== element.id);
    setContent(arr);
  };

  const contentEdit = async (newV) => {
    if (!newV) {
      setEditMode(null);
      return;
    }
    await BaseExtraAPI.editContent(newV.id, newV.side1, newV.side2, newV.tag);
    setEditMode(null);
    route(`/collections/${pageParam.id}/${pageParam.name}`);
  };

  return (
    <div>
      <MyTable
        onRowClick={onRowClick}
        edit={editMode}
        dataArray={content}
        namesArray={["side1", "side2", "tag", "id"]}
        btnsArray={[
          { name: "Edit", callback: editOn },
          { name: "Delete", callback: contentDelete },
        ]}
      />
    </div>
  );
};

export default TableContent;
