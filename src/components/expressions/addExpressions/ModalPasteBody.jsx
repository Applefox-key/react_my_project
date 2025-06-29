import React, { useRef } from "react";
import cl from "./addExpressions.module.scss";
import NewExpressionsList from "./NewExpressionsList";
import VoiceBtns from "../../users/VoiceBtn/VoiceBtns";

const ModalPasteBody = ({ dataArr, dataStr, setDataStr, setDataArr }) => {
  const textRef = useRef();
  return (
    <div className={cl["modal-paste"]}>
      {!dataArr ? (
        <>
          <div className={cl["btn-voice"]}>
            <VoiceBtns textRef={textRef} />
          </div>

          <textarea
            ref={textRef}
            value={dataStr}
            placeholder="phrase"
            onChange={(e) => {
              setDataStr(e.target.value);
            }}
            className="w-100 fs-4 vh80"
          />
        </>
      ) : (
        <NewExpressionsList dataArr={dataArr} setDataArr={setDataArr} />
      )}
    </div>
  );
};

export default ModalPasteBody;
