import React, { useRef, useState } from "react";
import cl from "./ExpressionsEdit.module.scss";
import { AiOutlineClear } from "react-icons/ai";
import { TiArrowRightOutline } from "react-icons/ti";
import VoiceBtns from "../../../UI/VoiceBtn/VoiceBtns";
import ExprStatusAtr from "../ExprStatus/ExprStatusAtr";
import SoundBtn from "../../../UI/VoiceBtn/SoundBtn";

const ExpressionBody = ({ smallSize = false, values, setters }) => {
  const { phrase, expression, note, inQueue, status } = values;
  const { setPhrase, setNote, setExpression, setInQueue, setStatus } = setters;
  const [copyBtn, setCopyBtn] = useState(false);
  const textRef = useRef();
  const popupRef = useRef();

  //show or hide selection button
  const clickOnPhrase = (e) => {
    e.stopPropagation();
    //checkSelection
    const textarea = textRef.current;
    if (!textarea) return;
    const isSelection = textarea.selectionStart !== textarea.selectionEnd;
    if (isSelection === copyBtn) return;
    setCopyBtn(isSelection);
  };

  const getSelectionFromTextarea = () => {
    const textarea = textRef.current;
    if (!textarea) return "";

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) return ""; //
    const selection = textarea.value.slice(start, end).trim();

    setExpression(selection);
    setCopyBtn(false);
    // return textarea.value.slice(start, end).trim();
  };

  return (
    <div className={smallSize ? cl["phrase-box-sm"] : cl["phrase-box"]}>
      {!smallSize && <span className={cl.title}>Expression to memorize</span>}

      <div
        className={expression ? cl["expressionStr"] : cl["expressionStrEmpty"]}>
        {copyBtn && (
          <button
            ref={popupRef}
            className={cl["popupBtn"]}
            onClick={getSelectionFromTextarea}>
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
          id="edit-phrase-area"
          onClick={clickOnPhrase}
          onTouchEnd={clickOnPhrase}
          onKeyUp={clickOnPhrase}
          onInput={clickOnPhrase}
          placeholder="....write a phrase to remember"
          autoFocus={!smallSize}
          // onBlur={(e) => {
          //   if (e.relatedTarget !== popupRef.current) setCopyBtn(false);
          // }}
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
      {!smallSize && (
        <ExprStatusAtr
          stat={status}
          inQueue={inQueue}
          onStatusChange={setStatus}
          onToggleQueue={setInQueue}
        />
      )}
      {!smallSize && <span className={cl.title}>....write a pop-up note</span>}
      <input
        className={cl.note}
        title="pop-up note"
        placeholder="....write a pop-up note"
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
