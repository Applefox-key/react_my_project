import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../UI/input/MyInputGroup";

const NewContentOne = ({ addContent }) => {
  const [newContent, setNewContent] = useState({
    question: "",
    answer: "",
    note: "",
  });

  return (
    <>
      <div className="d-flex">
        <MyInputGroup
          text="question"
          placeholder="question"
          value={newContent.question}
          onChange={(e) =>
            setNewContent({ ...newContent, question: e.target.value })
          }
        />
        <MyInputGroup
          text="note"
          placeholder="note"
          value={newContent.note}
          onChange={(e) =>
            setNewContent({ ...newContent, note: e.target.value })
          }></MyInputGroup>
      </div>
      <MyInputGroup
        text="answer"
        placeholder="answer"
        value={newContent.answer}
        onChange={(e) =>
          setNewContent({ ...newContent, answer: e.target.value })
        }>
        <Button
          variant="outline-dark"
          onClick={(e) => {
            e.stopPropagation();
            addContent(newContent);
            setNewContent({ question: "", answer: "", note: "" });
          }}>
          Add new card
        </Button>
      </MyInputGroup>
    </>
  );
};

export default NewContentOne;
