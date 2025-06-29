import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import cl from "./VoiceBtns.module.scss";

import { useOutsideClick } from "../../../hooks/useOutSideClick";
import { startV, stopV } from "../../../utils/voice";

const VoiceBtns = ({ textRef, disable, onchange = null }) => {
  const langArr = useMemo(() => ["en", "ru", "pl", "ua"], []);
  const [lang, setLang] = useState("en");
  const btnRef = useRef(null);
  const stopBtn = useRef(null);
  const startBtn = useRef(null);
  const onClick = () => {
    if (stopBtn.current.style.display === "none") {
      startV(textRef, lang || "", true);
      stopBtn.current.style.display = "inline";
      startBtn.current.style.display = "none";
    } else if (startBtn.current.style.display === "none") {
      stopV(textRef, onchange);
      startBtn.current.style.display = "inline";
      stopBtn.current.style.display = "none";
    }
  };

  useEffect(() => {
    stopBtn.current.style.display = "none";
  }, []);

  useOutsideClick(btnRef, () => {
    if (startBtn.current.style.display === "none") {
      stopV(textRef, onchange);
      startBtn.current.style.display = "inline";
      stopBtn.current.style.display = "none";
    }
  });
  const nextLang = () => {
    setLang(lang === 2 ? 0 : lang + 1);
  };
  return (
    <div
      className={
        disable
          ? [cl["voice-main"], cl["voice-hide"]].join(" ")
          : cl["voice-main"]
      }>
      <div ref={btnRef} className={cl["voice-wrap"]}>
        <div className={cl["langs"]}>
          {langArr.map((el) => (
            <p
              onClick={() => setLang(el)}
              className={cl["langEl" + (lang === el)]}>
              {el}
            </p>
          ))}
        </div>
        <button
          ref={stopBtn}
          id="stop-record-btn"
          title="Stop Dictation"
          onClick={onClick}
          onMouseDown={(e) => {
            if (e.button === 1) nextLang();
          }}>
          <FaMicrophoneSlash />
        </button>
        <button
          ref={startBtn}
          id="start-record-btn"
          onClick={onClick}
          title="Start Dictation">
          <FaMicrophone />
        </button>
      </div>
    </div>
  );
};

export default VoiceBtns;
