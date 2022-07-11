import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../UI/input/MyInputGroup";
import MyModal from "../UI/MyModal";

const WordEdit = ({ visible, setVisible, word, onClick }) => {
  const [newWord, setNewwWord] = useState(word.word);
  const [newSentence, setNewSentence] = useState(word.sentence);

  return (
    <MyModal
      visible={visible}
      setVisible={setVisible}
      title={word.word}
      fullscreen={true}
    >
      <MyInputGroup
        text="new sentence"
        value={newSentence}
        onChange={(e) => setNewSentence(e.target.value)}
      />
      <MyInputGroup
        text="word"
        value={newWord}
        onChange={(e) => setNewwWord(e.target.value)}
      >
        <Button
          onClick={() => {
            onClick(word.id, newWord, newSentence);
          }}
        >
          Save changes
        </Button>
      </MyInputGroup>
    </MyModal>
  );
};
export default WordEdit;
