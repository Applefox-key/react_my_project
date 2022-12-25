import React from "react";
import CardForHistoryList from "../UI/CardForHistoryList";
import CardForList from "../UI/CardForList";
import MyModal from "../UI/MyModal";

const ExpressionInfo = ({ visible, setVisible, expression }) => {
  let studyPlan = expression.studyPlan;
  let history = expression.userHistory;
  let dif = expression.diffInDays;
  return (
    <MyModal
      title={expression.expression}
      subtitle={expression.phrase}
      showmodal={visible}
      setshowmodal={setVisible}
      // dialogClassName="modal-info"
      dialogClassName={"modal-max"}>
      <div className="d-flex ">
        {/* <div> {expression.exceededSkipsDays}</div> */}
        <div>dif{dif}</div>
        <CardForList header="Study plan" subtitle="" list={studyPlan} />
        <CardForHistoryList header="History" subtitle="" list={history} />
      </div>
    </MyModal>
  );
};

export default ExpressionInfo;
