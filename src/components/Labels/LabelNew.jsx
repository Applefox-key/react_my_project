import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import MyModal from "../UI/MyModal";
import cl from "./Labels.module.scss";
import BaseAPI from "../../API/BaseAPI";
const LabelNew = ({ callback }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const addNew = async () => {
    if (!name) return;
    await BaseAPI.createLabel(name);
    if (callback) await callback();
  };
  return (
    <div>
      <button className={cl.btnPlus} onClick={() => setIsEdit(true)}>
        <FaPlus />
      </button>
      {isEdit && (
        <MyModal
          show={true}
          setshowmodal={setIsEdit}
          title="NEW LABEL"
          dialogClassName={cl.newLabel}>
          <div>
            <input
              autoFocus
              placeholder="label's name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button disabled={!name} className={cl.btnNL} onClick={addNew}>
              ADD
            </button>
          </div>
        </MyModal>
      )}
    </div>
  );
};

export default LabelNew;
