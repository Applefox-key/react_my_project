import React from "react";
import MyCardList from "../UI/MyCardList";
import MyModal from "../UI/MyModal";

const WordInfo = ({ visible, setVisible, word }) => {
  let studyPlan = word.studyPlan;
  let history = word.userHistory;

  return (
    <MyModal
      title={word.word}
      subtitle={word.sentence}
      visible={visible}
      setVisible={setVisible}
    >
      <div className="d-flex ">
        <MyCardList header="Study plan" subtitle="" list={studyPlan} />
        <MyCardList header="History" subtitle="" list={history} />
      </div>
    </MyModal>
  );
};

export default WordInfo;
