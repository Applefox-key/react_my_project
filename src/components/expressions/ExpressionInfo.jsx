import React from "react";
import MyCardList from "../UI/MyCardList";
import MyModal from "../UI/MyModal";

const ExpressionInfo = ({ visible, setVisible, expression }) => {
  let studyPlan = expression.studyPlan;
  let history = expression.userHistory;

  return (
    <MyModal
      title={expression.expression}
      subtitle={expression.phrase}
      showmodal={visible}
      setShowModal={setVisible}
      dialogClassName="modal-info">
      <div className="d-flex ">
        <MyCardList header="Study plan" subtitle="" list={studyPlan} />
        <MyCardList header="History" subtitle="" list={history} />
      </div>
    </MyModal>
  );
};

export default ExpressionInfo;
