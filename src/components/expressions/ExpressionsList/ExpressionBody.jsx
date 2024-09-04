import React, { useState } from "react";
import cl from "./ExpressionsList.module.scss";
import { AiOutlineClear } from "react-icons/ai";
import { TiArrowRightOutline } from "react-icons/ti";

const ExpressionBody = ({ smallSize = false, values, setters }) => {
  const { phrase, expression, note } = values;
  const { setPhrase, setNote, setExpression } = setters;
  const [copyBtn, setCopyBtn] = useState("");
  //show or hide selection button
  const clickOnPhrase = (e) => {
    e.stopPropagation();
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText === copyBtn) return;
    setCopyBtn(selectedText);
  }; //set selection as new expression
  const setSelection = () => {
    setExpression(copyBtn);
    setCopyBtn("");
  };
  return (
    <div className={cl["expression-body"]}>
      <div className={smallSize ? cl["phrase-box-sm"] : cl["phrase-box"]}>
        <div
          className={
            expression ? cl["expressionStr"] : cl["expressionStrEmpty"]
          }>
          {copyBtn && (
            <button className={cl["popupBtn"]} onClick={setSelection}>
              set selection as expression
              <TiArrowRightOutline />
            </button>
          )}
          {expression ? expression : "...select the part you want to remember"}
          {!!expression && (
            <button
              className={cl.buttonClear}
              onClick={() => setExpression("")}>
              <AiOutlineClear />
            </button>
          )}
        </div>
        <textarea
          onClick={clickOnPhrase}
          onTouchEnd={clickOnPhrase}
          placeholder="....write a phrase to remember"
          autoFocus
          readOnly={typeof setPhrase !== "function"}
          onChange={(e) =>
            typeof setPhrase === "function" ? setPhrase(e.target.value) : ""
          }
          value={phrase}
        />
        <input
          title="pop-up note"
          placeholder="....write a pop-up note"
          readOnly={typeof setPhrase !== "function"}
          onChange={(e) => {
            if (typeof setNote !== "function") return;
            e.preventDefault();
            setNote(e.target.value);
          }}
          value={note}
        />
      </div>
    </div>
  );
};

export default ExpressionBody;
