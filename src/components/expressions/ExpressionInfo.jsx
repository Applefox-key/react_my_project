import React from "react";
import CardForHistoryList from "../UI/CardForHistoryList";
import CardForList from "../UI/CardForList";
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
      dialogClassName={"modal-max"}
      stylesubt={{ maxWidth: "36rem" }}>
      <div className="d-flex ">
        <CardForList header="Study plan" subtitle="" list={studyPlan} />
        <CardForHistoryList header="History" subtitle="" list={history} />
      </div>
    </MyModal>
  );
};

export default ExpressionInfo;
