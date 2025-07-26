import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import cl from "./ExpressionsEdit.module.scss";
import Draggable from "react-draggable";
import ExpressionBody from "./ExpressionBody";
import SelectLabel from "../../../Labels/SelectLabel";
import { Expression } from "../../../../classes/Expression";
import Swal from "sweetalert2";
import Plan from "../../PlanAndHistory/Plan";

const EditWindow = ({ editMode, expressionActions }) => {
  const [copyBtn, setCopyBtn] = useState("");
  const [phrase, setPhrase] = useState(editMode.editElem.phrase);
  const [inQueue, setInQueue] = useState(editMode.editElem.inQueue);
  const [status, setStatus] = useState(editMode.editElem.status);
  const [label, setLabel] = useState({
    id: editMode.editElem.labelid,
    name: editMode.editElem.label,
  });
  const [expression, setExpression] = useState(editMode.editElem.expression);
  const [note, setNote] = useState(editMode.editElem.note);
  const closeModal = (e) => {
    if (e) e.stopPropagation();
    if (copyBtn) setCopyBtn("");

    expressionActions.contentEdit(
      editMode.editElem.id === "new" ? "newCancel" : ""
    );
  };
  const confirmChangeStatus = (newStatus) => {
    if (newStatus === "paused") {
      const exp = new Expression(editMode.editElem);
      if (exp.exceededSkipsDays > 2)
        Swal.fire({
          title: "Apply action?",
          text: "☹ The number of deviations from the study plan has been exceeded. The study will be started from the beginning after pause!",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (!result.isConfirmed) return;
        });
    }
    setStatus(newStatus);
  };
  //save expression on Server
  const save = () => {
    if (copyBtn) setCopyBtn("");
    expressionActions.contentEdit({
      ...editMode.editElem,
      phrase,
      expression,
      note,
      inQueue,
      status,
      labelid: label.id,
    });
    editMode.setEdit();
  };

  return (
    <div
      className={cl["modal-edit-wrap"]}
      onClick={(e) => {
        e.stopPropagation();
        const selection = window.getSelection();
        const selectedText = selection.toString();
        if (e.target === e.currentTarget && selectedText === "") closeModal();
      }}>
      <Draggable handle=".handle">
        <div className={cl["modal-box"]}>
          <div className={["handle", cl["head-edit-box"]].join(" ")}>
            <div>EDIT PHRASE</div>
            <Plan short expression={new Expression(editMode.editElem)} />
            <button
              className={cl["edit-close-btn"]}
              title="Clouse without changes"
              onClick={closeModal}>
              <IoMdClose />
            </button>
          </div>
          <ExpressionBody
            values={{ phrase, expression, note, inQueue, status }}
            setters={{
              setPhrase,
              setNote,
              setExpression,
              setInQueue,
              setStatus: confirmChangeStatus,
            }}
          />
          <div className={cl["footer-edit-box"]}>
            <div className={cl.label_wrap}>
              <SelectLabel
                addTitle
                colCat={label}
                onSelect={(val) =>
                  setLabel({
                    name: val ? val.name : "",
                    id: val ? val.id : "",
                  })
                }
              />
            </div>
            <button
              className={cl["edit-save-btn"]}
              title="Save changes"
              onClick={save}>
              SAVE CHANGES
            </button>{" "}
          </div>
          {/* <button
            className={cl["edit-cancel-btn"]}
            title="Cancel changes"
            onClick={save}>
            SAVE CHANGES
          </button> */}
        </div>
      </Draggable>
    </div>
  );
};

export default EditWindow;
