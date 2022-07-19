import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ExpressionCard from "./ExpressionCard";
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
      <h6 className="mt-3">you have {list.length} expressions to read</h6>

      <TransitionGroup className="d-flex p-2 flex-wrap justify-content-center">
        {list.map((expression) => (
          <CSSTransition
            timeout={500}
            classNames="expression"
            key={expression.id}
          >
            <ExpressionCard
              expression={expression}
              expressionUpdate={expressionUpdate}
              expressionInfo={expressionInfo}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

export default TrainingList;
