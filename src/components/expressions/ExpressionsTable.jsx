import React from "react";
import MyTable from "../UI/table/MyTable";

import { CSSTransition } from "react-transition-group";

const ExpressionsTable = ({
  expressions,
  editMode,
  modalExpressionInfo,
  expressionsActions,
  editOn,
}) => {
  const btnsArray = [
    { nameMain: "Add row", callback: expressionsActions.addNew },
    { nameMain: "Delete all", callback: expressionsActions.expressionsDelete },
    { name: "Plan", callback: modalExpressionInfo },
    { name: "Delete", callback: expressionsActions.expressionsDelete },
  ];
  return (
    <>
      {editMode && (
        <div className="divAdvice">
          YOU CAN SELECT A PART OF A PHRASE AND SET IT AS AN EXPRESSION. THE
          EXPRESSION WILL BE HIGHLIGHTED DURING TRAINING.
        </div>
      )}
      <CSSTransition appear={true} in={true} timeout={2000} classNames="page">
        <MyTable
          edit={editMode}
          dataArray={expressions}
          namesArray={["expression", "phrase", "stage"]}
          onRowClick={editOn}
          btnsArray={btnsArray}
        />
      </CSSTransition>
    </>
  );
};

export default ExpressionsTable;
