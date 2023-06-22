import React, { useState } from "react";

import cl from "./ExpressionsList.module.scss";
const EditWindow = ({ editElem, expressionsActions, editOn }) => {
  const [copyBtn, setCopyBtn] = useState("");
  const [value, setValue] = useState(editElem.phrase);
  const [valueExp, seValueExp] = useState(editElem.expression);
  const [note, setNote] = useState(editElem.note);
  const closeModal = () => {
    if (copyBtn) setCopyBtn("");
    expressionsActions.contentEdit(editElem.id === "new" ? "newCancel" : "");
  };
  //show or hide selection button
  const clickOnPhrase = (e) => {
    e.stopPropagation();
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText === copyBtn) return;
    setCopyBtn(selectedText);
  };

  //save expression on Server
  const save = () => {
    if (copyBtn) setCopyBtn("");
    expressionsActions.contentEdit({
      ...editElem,
      phrase: value,
      expression: valueExp,
      note: note,
    });
    editOn();
  };
  //set selection as new expression
  const setSelection = () => {
    seValueExp(copyBtn);
    setCopyBtn("");
  };
  return (
    <div
      className={cl["modal-wrap"]}
      onClick={(e) => {
        const selection = window.getSelection();
        const selectedText = selection.toString();

        if (e.target === e.currentTarget && selectedText === "") closeModal();
      }}>
      <div className={cl["modal-box"]}>
        <div className={cl["top-edit-box"]}>
          {/* <span>edit phrase</span> */}
          {copyBtn && (
            <button className={cl["popupBtn"]} onClick={setSelection}>
              set selection as expression
            </button>
          )}
          <button
            className={cl["edit-close-btn"]}
            title="Clouse without changes"
            onClick={closeModal}>
            ❌
          </button>{" "}
        </div>
        <div className={cl["edit-body"]}>
          {" "}
          <div
            className={
              valueExp ? cl["expressionStr"] : cl["expressionStrEmpty"]
            }>
            {valueExp ? valueExp : "...select the part you want to remember"}
          </div>
          {/* {valueExp && <div className={cl["expressionStr"]}>{valueExp}</div>} */}
          <div className={cl["phrase-box"]}>
            <div onClick={clickOnPhrase} onTouchEnd={clickOnPhrase}>
              <textarea
                placeholder="....write a phrase to remember"
                autoFocus
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />{" "}
            </div>
            <input
              title="pop-up note"
              placeholder="....write a pop-up note"
              onChange={(e) => {
                e.preventDefault();
                setNote(e.target.value);
              }}
              value={note}
            />
          </div>{" "}
          <button
            className={cl["edit-save-btn"]}
            title="Save changes"
            onClick={save}>
            Save changes
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default EditWindow;
