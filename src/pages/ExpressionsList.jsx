import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "../hooks/useQuery";

import MyTable from "../components/UI/table/MyTable";
import ExpressionInfo from "../components/expressions/ExpressionInfo";
import MySpinner from "../components/UI/MySpinner";
import BaseAPI from "../API/BaseAPI";

import ExpressionsMenu from "../components/expressions/ExpressionsMenu";
import { PopupContext } from "../context";

const ExpressionsList = () => {
  // eslint-disable-next-line no-unused-vars
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
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
    await BaseAPI.deleteExpression(expression.id);
    let arr = expressions.filter((elem) => elem.id !== expression.id);
    setExpressions(arr);
  };

  const deleteAllExpressions = async () => {
    if (!window.confirm("Delete all expressions?")) return;
    await BaseAPI.deleteAllExpressions();
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
      await BaseAPI.createExpression(newV.expression, newV.phrase);
      setExpressions(await BaseAPI.getTrainingListAll());
      setEditMode(null);
      setPopupSettings([true, "expression was added", "success"]);
      return;
    }
    await BaseAPI.editExpression(newV.id, newV.expression, newV.phrase);
    setEditMode(null);
    getExpression();
  };
  const addRow = async () => {
    const newEl = {
      id: "new",
      expression: "",
      phrase: "",
    };
    // await BaseExtraAPI.deleteColContent(pageParam.id);
    setExpressions([newEl, ...expressions]);
    editOn(newEl);
  };

  return (
    <div className="mt-3">
      {dataModal ? dataModal : <></>}
      <ExpressionsMenu
        deleteAllExpressions={deleteAllExpressions}
        setExpressions={setExpressions}
      />
      {!isLoading ? (
        <MyTable
          edit={editMode}
          dataArray={expressions}
          namesArray={["expression", "phrase", "stage"]}
          onRowClick={modalExpressionInfo}
          btnsArray={[
            { nameMain: "Add row", callback: addRow },
            { nameMain: "Delete all", callback: deleteAllExpressions },
            { name: "Edit", callback: editOn },
            { name: "Delete", callback: expressionDelete },
          ]}
        />
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default ExpressionsList;
