import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import NewExpressionFile from "../components/expressions/NewExpressionFile";
import ExpressionsListMenu from "../components/expressions/ExpressionsListMenu";
import NewExpressionOne from "../components/expressions/NewExpressionOne";
import MyTable from "../components/UI/table/MyTable";
import ExpressionInfo from "../components/expressions/ExpressionInfo";
import MySpinner from "../components/UI/MySpinner";
import BaseAPI from "../API/BaseAPI";
import TabPills from "../components/UI/TabPills";
import RadioCheck from "../components/UI/radio/RadioCheck";
import { PopupContext } from "../context";
import * as ExpAct from "../utils/expressionsAction";

const ExpressionsList = () => {
  const [expressions, setExpressions] = useState();
  const [dataModal, setDataModal] = useState(false);
  const route = useNavigate();
  const [editMode, setEditMode] = useState(null);
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [getExpression, isLoading, error] = useQuery(async () => {
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

  // const modalExpressionEdit = (expression) => {
  //   setDataModal(
  //     <ExpressionEdit
  //       visible={true}
  //       setVisible={setDataModal}
  //       expression={expression}
  //       onClick={editExpression}
  //     />
  //   );
  // };

  //actions

  const addExpression = (newExpr) => {
    ExpAct.addExpression(newExpr, setExpressions, setPopupSettings);
  };
  const addExpressionsFromFile = async (newExprArr) => {
    ExpAct.addExpressionsFromFile(newExprArr, setExpressions);
  };
  const expressionDelete = async (expression) => {
    ExpAct.expressionDelete(expression, setExpressions);
  };
  const deleteAllExpressions = async () => {
    ExpAct.deleteAllExpressions(setExpressions);
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
    route(`/expressions`);
  };

  return (
    <div>
      {dataModal ? dataModal : <></>}

      <ExpressionsListMenu deleteAllExpressions={deleteAllExpressions} />
      <TabPills tabsArr={["Add one expression", "Add from File"]}>
        <NewExpressionOne addExpression={addExpression} />
        <NewExpressionFile addExpressions={addExpressionsFromFile} />
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
