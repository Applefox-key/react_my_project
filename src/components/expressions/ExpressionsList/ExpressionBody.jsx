import React, { useRef, useState } from "react";
import cl from "./ExpressionsList.module.scss";
import { AiOutlineClear } from "react-icons/ai";
import { TiArrowRightOutline } from "react-icons/ti";
import VoiceBtns from "../../users/VoiceBtn/VoiceBtns";
import ExprStatus from "./ExprStatus";
import { statusArr } from "../../../constants/statusConst";
import SoundBtn from "../../users/VoiceBtn/SoundBtn";

const ExpressionBody = ({ smallSize = false, values, setters }) => {
  const { phrase, expression, note } = values;
  const { setPhrase, setNote, setExpression } = setters;
  const [copyBtn, setCopyBtn] = useState("");
  //show or hide selection button
  const clickOnPhrase = (e) => {
    e.stopPropagation();
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText === copyBtn) return;
    setCopyBtn(selectedText);
  }; //set selection as new expression
  const setSelection = () => {
    setExpression(copyBtn);
    setCopyBtn("");
  };
  const textRef = useRef();
  return (
    // <div className={[cl["expression-body-box"]]}>
    <div className={smallSize ? cl["phrase-box-sm"] : cl["phrase-box"]}>
      <span className={cl.title}>Expression to memorize</span>
      <div
        className={expression ? cl["expressionStr"] : cl["expressionStrEmpty"]}>
        {copyBtn && (
          <button className={cl["popupBtn"]} onClick={setSelection}>
            set selection as expression
            <TiArrowRightOutline />
          </button>
        )}
        {expression ? (
          <mark>{expression}</mark>
        ) : (
          "...select the part you want to remember"
        )}
        {!!expression && (
          <button className={cl.buttonClear} onClick={() => setExpression("")}>
            <AiOutlineClear />
          </button>
        )}
      </div>
      <div className={cl.textVoice}>
        <textarea
          ref={textRef}
          onClick={clickOnPhrase}
          onTouchEnd={clickOnPhrase}
          placeholder="....write a phrase to remember"
          autoFocus
          readOnly={typeof setPhrase !== "function"}
          onChange={(e) =>
            typeof setPhrase === "function" ? setPhrase(e.target.value) : ""
          }
          value={phrase}
        />
        {!!textRef && !smallSize && (
          <div className={cl["phrase-sounds"]}>
            <SoundBtn text={phrase} />
            <div className={cl["phrase-edit-voice"]}>
              <VoiceBtns textRef={textRef} />
            </div>
          </div>
        )}
      </div>
      <ExprStatus
        stat={statusArr[Math.floor(Math.random() * 4)]}
        inPool={Math.floor(Math.random() * 2) % 2 === 0}
      />{" "}
      <span className={cl.title}>....write a pop-up note</span>
      <input
        className={cl.note}
        title="pop-up note"
        placeholder="....write a pop-up note"
        readOnly={typeof setPhrase !== "function"}
        onChange={(e) => {
          if (typeof setNote !== "function") return;
          e.preventDefault();
          setNote(e.target.value);
        }}
        value={note}
      />
    </div>
    // </div>
  );
};

export default ExpressionBody;
