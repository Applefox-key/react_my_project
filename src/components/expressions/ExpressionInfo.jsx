import React from "react";
import MyCardList from "../UI/CardForList";
import MyModal from "../UI/MyModal";

const ExpressionInfo = ({ visible, setVisible, expression }) => {
  let studyPlan = expression.studyPlan;
  let history = expression.userHistory;

  return (
    <MyModal
      title={expression.expression}
      subtitle={expression.phrase}
      showmodal={visible}
      setshowmodal={setVisible}
      // dialogClassName="modal-info"
      dialogClassName={"modal-max"}>
      <div className="d-flex ">
        <MyCardList header="Study plan" subtitle="" list={studyPlan} />
        <MyCardList header="History" subtitle="" list={history} />
      </div>
    </MyModal>
  );
};

export default ExpressionInfo;
