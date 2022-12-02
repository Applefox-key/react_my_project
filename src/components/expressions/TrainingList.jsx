import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ExpressionBlock from "./ExpressionBlock";
import ExpressionInfo from "./ExpressionInfo";

const TrainingList = ({ list = [], expressionUpdate }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [contentModal, setContentModal] = useState("");

  const expressionInfo = (expression) => {
    setVisibleModal(true);
    setContentModal(expression);
  };
  return (
    <>
      <ExpressionInfo
        visible={visibleModal}
        setVisible={setVisibleModal}
        expression={contentModal}
      />
      {list.length ? (
        <TransitionGroup className="d-flex p-2 flex-wrap justify-content-center">
          {list.map((expression) => (
            <CSSTransition
              timeout={500}
              classNames="expression"
              key={expression.id}>
              <ExpressionBlock
                expression={expression}
                expressionUpdate={expressionUpdate}
                expressionInfo={expressionInfo}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <h1 className="display-1">there are no expressions for training!</h1>
      )}
    </>
  );
};

export default TrainingList;
