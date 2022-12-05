import React, { useState, useEffect } from "react";
import { useQuery } from "../../hooks/useQuery";

import MyTable from "../UI/table/MyTable";
import ExpressionInfo from "./ExpressionInfo";
import MySpinner from "../UI/MySpinner";
import BaseAPI from "../../API/BaseAPI";

import ExpressionsMenu from "./ExpressionsMenu";
import { usePopup } from "../../hooks/usePopup";

const ExpressionsList = () => {
  const setPopup = usePopup();
  const [expressions, setExpressions] = useState();
  const [dataModal, setDataModal] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [getExpression, isLoading] = useQuery(async () => {
    const expressions = await BaseAPI.getTrainingListAll();
    setExpressions(expressions);
  });

  useEffect(() => {
    getExpression();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //modal content
  const modalExpressionInfo = (expression) => {
    setDataModal(
      <ExpressionInfo
        visible={true}
        setVisible={setDataModal}
        expression={expression}
      />
    );
  };
  //actions
  const expressionDelete = async (expression) => {
    if (!window.confirm("Delete the expression?")) return;
    let res = await BaseAPI.deleteExpression(expression.id);
    if (res.error) {
      setPopup.error("Somethig goes wrong.." + res.error);
      return;
    }
    let arr = expressions.filter((elem) => elem.id !== expression.id);
    setExpressions(arr);
  };
  const expressionState = (item) => {
    let days = item.exceededSkipsDays;
    if (days > 1) return <button className="circle bg-danger" />;

    if (days > 0) return <button className="circle bg-warning" />;
    return <></>;
  };
  const deleteAllExpressions = async () => {
    if (!window.confirm("Delete all expressions?")) return;
    let res = await BaseAPI.deleteAllExpressions();
    if (res.error) {
      setPopup.error("Somethig goes wrong.." + res.error);
      return;
    }
    setExpressions([]);
  };

  const editOn = (content) => {
    setEditMode({
      content: content,
      names: ["expression", "phrase"],
      edit: contentEdit,
    });
  };
  const contentEdit = async (newV) => {
    if (!newV) {
      setEditMode(null);
      return;
    }
    if (newV === "newCancel") {
      setEditMode(null);
      setExpressions(expressions.filter((el) => el.id !== "new"));
      return;
    }
    if (newV.id === "new") {
      try {
        await BaseAPI.createExpression(newV.expression, newV.phrase);
        setExpressions(await BaseAPI.getTrainingListAll());
        setEditMode(null);
        setPopup.success("expression was added");
        return;
      } catch (error) {
        setPopup.error(error.message);
      }
    }
    try {
      await BaseAPI.editExpression(newV);
    } catch (error) {
      setPopup.error(error.message);
    }
    setEditMode(null);
    getExpression();
  };
  const addRow = async () => {
    const newEl = {
      id: "new",
      expression: "",
      phrase: "",
    };
    setExpressions([newEl, ...expressions]);
    editOn(newEl);
  };

  return (
    <div className="mt-3 tableContainer">
      {dataModal ? dataModal : <></>}
      <ExpressionsMenu
        deleteAllExpressions={deleteAllExpressions}
        setExpressions={setExpressions}
        addOne={addRow}
      />
      {!isLoading ? (
        <MyTable
          edit={editMode}
          dataArray={expressions}
          namesArray={["expression", "phrase", "stage"]}
          onRowClick={editOn}
          btnsArray={[
            { nameMain: "Add row", callback: addRow },
            { nameMain: "Delete all", callback: deleteAllExpressions },
            // { name: "Edit", callback: editOn },
            { name: "Plan", callback: modalExpressionInfo },
            { name: "Delete", callback: expressionDelete },
            { name: "", callback: expressionState },
          ]}
        />
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default ExpressionsList;
