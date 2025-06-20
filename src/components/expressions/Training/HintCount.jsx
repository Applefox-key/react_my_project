import React from "react";
import SoundBtn from "../../users/VoiceBtn/SoundBtn";

const HintCount = ({ hint, phrase, setSett }) => {
  const [hintForUser, od, count] = hint;
  // const cl1 = od ? "circle bg-danger" : "circle bg-warning";
  // const cl2 = od ? "circle bg-dark" : "circle bg-primary";
  const cl1 = od ? "circle darkHint" : "circle ";
  const cl2 = od ? "circle darkHint" : "circle";

  return (
    <>
      <div className="hint1" onClick={setSett}>
        <div className="hintText">{hintForUser}</div>
        <div className="hintSound">
          <SoundBtn text={phrase} />
        </div>
        <div className="d-flex circles-hint hintAnim">
          <div>{count} times</div>
          <div className="hint1-btn">
            <button className={cl1}></button>
            <button className={cl2}></button>
            {count === 3 && <button className={cl1}></button>}
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default HintCount;
