import React, { useState } from "react";
import cl from "./addExpressions.module.scss";
const NewExpressionsList = ({ dataArr, setDataArr }) => {
  const [copyBtn, setCopyBtn] = useState({ i: -1, text: "" });

  const expressionSelect = () => {
    setDataArr(
      dataArr.map((el, num) =>
        num === copyBtn.i ? { ...el, expression: copyBtn.text } : el
      )
    );
    setCopyBtn({ i: -1, text: "" });
  };

  const clickOnPhrase = (i) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    //selection is not empty and is new
    if (selectedText && (selectedText !== copyBtn.text || i !== copyBtn.i))
      setCopyBtn({ i: i, text: selectedText });
    //selection is empty and copyBtn is not empty
    else if (!selectedText && copyBtn.i > -1) setCopyBtn({ i: -1, text: "" });
  };
  const expressionDelete = (i) => {
    if (!window.confirm("Delete the phrase?")) return false;
    setDataArr(dataArr.filter((el) => el.id !== i));
  };
  return (
    <>
      {dataArr.map((el, i) => (
        <div className={cl.addingRow} key={i}>
          {i + 1} <span>{el.expression} </span>
          <div
            onClick={(e) => {
              e.stopPropagation();
              clickOnPhrase(i);
            }}>
            {el.phrase}
          </div>
          <button className={cl.deleteBtn} onClick={() => expressionDelete(i)}>
            ✕
          </button>
          {copyBtn.i === i && (
            <button className="popupBtn" onClick={expressionSelect}>
              set as an expression
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default NewExpressionsList;
