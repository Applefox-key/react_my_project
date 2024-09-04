import React from "react";
import cl from "./addExpressions.module.scss";
import ExpressionBody from "../ExpressionsList/ExpressionBody";

const NewExpressionsList = ({ dataArr, setDataArr }) => {
  const expressionSelect = (i, newV) => {
    setDataArr(
      dataArr.map((el, num) => (num === i ? { ...el, expression: newV } : el))
    );
  };

  const expressionDelete = (inum) => {
    if (!window.confirm("Delete the phrase?")) return false;
    setDataArr(dataArr.filter((el, i) => i !== inum));
  };

  return (
    <>
      {dataArr.map((el, i) => (
        <div className={cl.addingRow} key={i}>
          <div className={cl.addingRowHead}>
            <span>{i + 1}</span>
            {(!el || !el.phrase || !el.expression) &&
              "please specify the phrase to remember"}

            <button
              className={cl.deleteBtn}
              onClick={() => expressionDelete(i)}>
              ✕
            </button>
          </div>

          <ExpressionBody
            smallSize
            values={{ phrase: el.phrase, expression: el.expression }}
            setters={{ setExpression: (val) => expressionSelect(i, val) }}
          />
        </div>
      ))}
    </>
  );
};

export default NewExpressionsList;
