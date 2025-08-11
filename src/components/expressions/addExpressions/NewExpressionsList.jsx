import React from "react";
import cl from "./addExpressions.module.scss";
import ExpressionBody from "../ExpressionsList/ModalPartsExpression/ExpressionBody";
import { sAlert } from "../../../utils/alert";

const NewExpressionsList = ({ dataArr, setDataArr }) => {
  const expressionSelect = (i, updatedData, field) => {
    setDataArr(
      dataArr.map((el, num) =>
        num === i ? { ...el, [field]: updatedData } : el
      )
    );
  };

  const expressionDelete = async (inum) => {
    // if (!window.confirm("Delete the phrase?")) return false;

    const result = await sAlert({
      title: "Delete this phrase?",
      text: "This action cannot be undone.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return false;

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
            values={{
              phrase: el.phrase,
              expression: el.expression,
              note: el.note || "",
            }}
            setters={{
              setExpression: (val) => expressionSelect(i, val, "expression"),
              setPhrase: (val) => expressionSelect(i, val, "phrase"),
              setNote: (val) => expressionSelect(i, val, "note"),
            }}
          />
        </div>
      ))}
    </>
  );
};

export default NewExpressionsList;
