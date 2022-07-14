import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import WordCard from "./WordCard";
import WordInfo from "./WordInfo";

const WordList = ({ list = [], wordUpdate }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [contentModal, setContentModal] = useState("");

  const wordInfo = (word) => {
    setVisibleModal(true);
    setContentModal(word);
  };
  return (
    <>
      <WordInfo
        visible={visibleModal}
        setVisible={setVisibleModal}
        word={contentModal}
      />
      <h6 className="mt-3">you have {list.length} words to read</h6>

      <TransitionGroup className="d-flex p-2 flex-wrap justify-content-center">
        {list.map((word) => (
          <CSSTransition timeout={500} classNames="word" key={word.id}>
            <WordCard word={word} wordUpdate={wordUpdate} wordInfo={wordInfo} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

export default WordList;
