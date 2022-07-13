import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../UI/input/MyInputGroup";

const NewWordOne = ({ addWord }) => {
  const [newWord, setNewWord] = useState({ word: "", sentence: "" });
  return (
    <>
      <MyInputGroup
        text="sentence"
        placeholder="sentence"
        value={newWord.sentence}
        onChange={(e) => setNewWord({ ...newWord, sentence: e.target.value })}
      />
      <MyInputGroup
        text="new word"
        placeholder="word"
        value={newWord.word}
        onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
      >
        <Button
          variant="outline-dark"
          onClick={(e) => {
            e.stopPropagation();
            addWord(newWord);
            setNewWord({ word: "", sentence: "" });
          }}
        >
          Add new word
        </Button>
      </MyInputGroup>
    </>
  );
};

export default NewWordOne;
