import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import cl from "./ExpressionsList.module.scss";
import Draggable from "react-draggable";
import ExpressionBody from "./ExpressionBody";
import SoundBtn from "../../users/VoiceBtn/SoundBtn";
import SelectLabel from "../../Labels/SelectLabel";

const EditWindow = ({ editMode, expressionsActions }) => {
  const [copyBtn, setCopyBtn] = useState("");
  const [phrase, setPhrase] = useState(editMode.editElem.phrase);
  const [label, setLabel] = useState({
    id: editMode.editElem.labelid,
    name: editMode.editElem.label,
  });
  const [expression, setExpression] = useState(editMode.editElem.expression);
  const [note, setNote] = useState(editMode.editElem.note);
  const closeModal = (e) => {
    console.log(1);

    if (e) e.stopPropagation();
    if (copyBtn) setCopyBtn("");

    expressionsActions.contentEdit(
      editMode.editElem.id === "new" ? "newCancel" : ""
    );
  };
  //save expression on Server
  const save = () => {
    if (copyBtn) setCopyBtn("");
    expressionsActions.contentEdit({
      ...editMode.editElem,
      phrase: phrase,
      expression: expression,
      note: note,
      labelid: label.id,
    });
    editMode.setEdit();
  };

  return (
    <div
      className={cl["modal-wrap"]}
      onClick={(e) => {
        const selection = window.getSelection();
        const selectedText = selection.toString();
        if (e.target === e.currentTarget && selectedText === "") closeModal();
      }}>
      <Draggable handle=".handle">
        <div className={cl["modal-box"]}>
          <div className={["handle", cl["top-edit-box"]].join(" ")}>
            <div>EDIT PHRASE</div>
            <SoundBtn text={phrase} />
            <button
              className={cl["edit-close-btn"]}
              title="Clouse without changes"
              onClick={closeModal}>
              <IoMdClose />
            </button>{" "}
          </div>

          <ExpressionBody
            values={{ phrase, expression, note }}
            setters={{ setPhrase, setNote, setExpression }}
          />
          <div className={cl["edit-bottom"]}>
            <div className={cl.label_wrap}>
              <SelectLabel
                isOne={true}
                colCat={label}
                onSelect={(val) =>
                  setLabel({
                    name: val ? val.name : "",
                    id: val ? val.id : "",
                  })
                }
              />
            </div>
            <button
              className={cl["edit-save-btn"]}
              title="Save changes"
              onClick={save}>
              SAVE CHANGES
            </button>{" "}
          </div>
          {/* <button
            className={cl["edit-cancel-btn"]}
            title="Cancel changes"
            onClick={save}>
            SAVE CHANGES
          </button> */}
        </div>
      </Draggable>
    </div>
  );
};

export default EditWindow;
