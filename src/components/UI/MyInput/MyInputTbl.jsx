import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";

const MyInputTbl = ({
  name,
  content,
  callback = null,
  onblur,
  onEnter = "",
}) => {
  const [value, setValue] = useState(
    content[name] === null ? "" : content[name]
  );
  const [copyBtn, setCopyBtn] = useState("");

  const Addbtn = (e) => {
    e.stopPropagation();
    if (e.target.selectionStart === e.target.selectionEnd) {
      setCopyBtn("");
      return;
    }
    setCopyBtn(
      e.target.value.slice(e.target.selectionStart, e.target.selectionEnd)
    );
  };
  return (
    <>
      <Form.Control
        className="fs-4"
        style={{ caretColor: "auto" }}
        autoFocus
        as={value.length < 82 ? "input" : "textarea"}
        aria-label={name}
        value={value}
        onBlur={onblur}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={(e) => {
          if (!onEnter) return;
          if (e.key === "Enter") onEnter();
        }}
        onSelect={name !== "phrase" ? "" : Addbtn}
        onChange={(e) => {
          e.stopPropagation();

          setValue(e.target.value);
          callback(e);
        }}
        aria-describedby="basic-addon1"
      />

      {copyBtn !== "" && (
        <button
          className="popupBtn"
          id="popupBtn"
          onClick={() => {
            onEnter({
              id: content.id,
              phrase: value,
              expression: copyBtn,
            });
          }}>
          set selection as expression
        </button>
      )}
    </>
  );
};

export default MyInputTbl;
