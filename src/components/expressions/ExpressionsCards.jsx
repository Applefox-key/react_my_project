import React, { useState } from "react";
import { addSpanToExpInPrase } from "../../utils/texts";
import MyProgressBar from "../UI/table/MyProgressBar/MyProgressBar";
import { expressionState } from "../../utils/expressions";
import CardForList from "../UI/CardForList";
import CardForHistoryList from "../UI/CardForHistoryList";

const ExpressionsCards = ({
  expressions,
  editMode,
  expressionsActions,
  editOn,
}) => {
  const [copyBtn, setCopyBtn] = useState("");
  const [currentEl, setCarrentEl] = useState(null);
  const [isInfo, setIsInfo] = useState(false);

  const Addbtn = (e) => {
    e.stopPropagation();
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText === "") {
      setCopyBtn("");
      return;
    }
    setCopyBtn(selectedText);
  };
  const closeModal = () => {
    if (copyBtn) setCopyBtn("");
    setCarrentEl(null);

    expressionsActions.contentEdit(editMode.id === "new" ? "newCancel" : "");
  };

  return (
    <div>
      {editMode && (
        <div
          className="editCard-wrap"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}>
          <div className="editCard-box">
            {currentEl && (
              <div className={isInfo ? "info-edit info_show" : "info-edit"}>
                <div className="info-body">
                  <CardForList list={currentEl.studyPlan} mini={true} />
                  <CardForHistoryList
                    list={currentEl.userHistory}
                    mini={true}
                  />
                </div>
                <div className="info-title" onClick={() => setIsInfo(!isInfo)}>
                  HISTORY AND PLAN <span>{!isInfo ? "🔻" : "🔺"}</span>
                </div>
              </div>
            )}
            <div className="express-box">
              <h3>EXPRESSION:</h3>
              <div className="fs-2 mb-3">{editMode.expression}</div>{" "}
            </div>{" "}
            <button
              className="edit-close-btn"
              title="Clouse without changes"
              onClick={closeModal}>
              ❌
            </button>{" "}
            <button
              className="edit-save-btn"
              title="Save changes"
              onClick={() => {
                if (copyBtn) setCopyBtn("");
                setCarrentEl(null);
                expressionsActions.contentEdit(editMode);
              }}>
              ✔️
            </button>
            <div className="edit-body">
              <div className="divAdvice  pt-2 grayAdv">
                SELECT A PART OF A PHRASE AND SET IT AS AN EXPRESSION. THE
                EXPRESSION WILL BE HIGHLIGHTED DURING TRAINING.
              </div>
              <div className="phrase-box">
                {/* <h3>PHRASE:</h3> */}
                <textarea
                  placeholder="phrase"
                  rows={
                    editMode.phrase ? Math.ceil(editMode.phrase.length / 50) : 7
                  }
                  onChange={(e) => {
                    editOn({
                      ...editMode,
                      phrase: e.target.value,
                    });
                  }}
                  value={editMode.phrase}
                  onSelect={Addbtn}
                />
              </div>

              {copyBtn !== "" && (
                <button
                  className="popupBtn"
                  onClick={() => {
                    editOn({ ...editMode, expression: copyBtn });
                    setCopyBtn("");
                  }}>
                  set selection as expression
                </button>
              )}
            </div>{" "}
          </div>{" "}
        </div>
      )}

      {/* <CSSTransition appear={true} in={true} timeout={2000} classNames="page"> */}
      <div className="d-flex flex-wrap">
        {expressions.map((el) => (
          <div
            key={el.id}
            className="oneItem"
            onClick={(e) => {
              setCarrentEl(el);
              editOn(el);
            }}>
            <br />{" "}
            <MyProgressBar stage={el.stage} color={expressionState(el)} />
            {addSpanToExpInPrase(el)}{" "}
            <button
              className="edit-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                expressionsActions.expressionsDelete(el);
              }}>
              ❌
            </button>{" "}
          </div>
        ))}
      </div>
      {/* </CSSTransition> */}
    </div>
  );
};

export default ExpressionsCards;
