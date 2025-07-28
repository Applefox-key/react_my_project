import React, { useState } from "react";
import MyModal from "../UI/MyModal/MyModal";
import cl from "./Labels.module.scss";
import BaseAPI from "../../API/BaseAPI";
import { CiEdit } from "react-icons/ci";
import { HiOutlineFolderAdd } from "react-icons/hi";

const LabelEdit = ({ callback, label = null }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(label ? label.name : "");

  const addNew = async () => {
    if (!name) return;
    await BaseAPI.createLabel(name);
    if (callback) await callback();
    setIsEdit(false);
  };
  const edit = async () => {
    if (!name) return;
    await BaseAPI.editLabel({ name: name }, label.id);
    if (callback) await callback();
    setIsEdit(false);
  };
  return (
    <>
      {!label ? (
        <button className={cl.btnPlus} onClick={() => setIsEdit(true)}>
          <HiOutlineFolderAdd />
          ADD NEW TAG
        </button>
      ) : (
        <button className={cl.btnEdit} onClick={() => setIsEdit(true)}>
          <CiEdit /> edit tag
        </button>
      )}
      {isEdit && (
        <MyModal
          show={true}
          setshowmodal={setIsEdit}
          title={label ? "EDIT TAG" : "NEW TAG"}
          dialogClassName={cl.newLabel}>
          <div>
            <input
              autoFocus
              placeholder="tag's name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              disabled={!name}
              className={cl.btnNL}
              onClick={label ? edit : addNew}>
              {label ? "SAVE" : "ADD"}
            </button>
          </div>
        </MyModal>
      )}
    </>
  );
};

export default LabelEdit;
