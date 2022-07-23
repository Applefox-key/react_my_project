import React, { useState, useEffect } from "react";
import { useQuery } from "../hooks/useQuery";
import ExpressionsListMenu from "../components/expressions/ExpressionsListMenu";
import NewExpressionOne from "../components/expressions/NewExpressionOne";
import MyTable from "../components/UI/table/MyTable";
import ExpressionInfo from "../components/expressions/ExpressionInfo";
import MySpinner from "../components/UI/MySpinner";
import BaseAPI from "../API/BaseAPI";
import TabPills from "../components/UI/TabPills";
import NewExpressionFile from "../components/expressions/NewExpressionFile";
import NewExpressionPaste from "../components/expressions/NewExpressionPaste";

const ExpressionsList = () => {
  const [expressions, setExpressions] = useState();
  const [dataModal, setDataModal] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [getExpression, isLoading] = useQuery(async () => {
    const expressions = await BaseAPI.getTrainingListAll();
    setExpressions(expressions);
  });

  useEffect(() => {
    getExpression();
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
    await BaseAPI.editExpression(newV.id, newV.expression, newV.phrase);
    setEditMode(null);
    getExpression();
  };

  return (
    <div className="mt-3">
      {dataModal ? dataModal : <></>}

      <ExpressionsListMenu deleteAllExpressions={deleteAllExpressions} />
      <TabPills tabsArr={["Add one expression", "Add several expressions"]}>
        <NewExpressionOne setExpressions={setExpressions} />
        <>
          <NewExpressionFile setExpressions={setExpressions} />
          <NewExpressionPaste setExpressions={setExpressions} />{" "}
        </>
      </TabPills>

      {!isLoading ? (
        <MyTable
          edit={editMode}
          dataArray={expressions}
          namesArray={["expression", "phrase", "nextDate", "stage"]}
          onRowClick={modalExpressionInfo}
          btnsArray={[
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
