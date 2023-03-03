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
  const [value, setValue] = useState(content === null ? "" : content);
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
        aria-label={name}
        value={value}
        onBlur={onblur}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyPress={(e) => {
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
          onClick={() =>
            onEnter({ id: content.id, phrase: value, expression: copyBtn })
          }>
          set selection as expression
        </button>
      )}
    </>
  );
};

export default MyInputTbl;
