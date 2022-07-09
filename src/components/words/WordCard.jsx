import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

const WordCard = ({ word, wordUpdate, wordInfo }) => {
  const [hintForUser, overdue] = word.hintForReading;

  return (
    <>
      <Card className="my-4 " style={{ width: "90%" }}>
        <Card.Body>
          <Card.Header className="text-lg-start" as="h5">
            {word.word}
          </Card.Header>
          <Card.Subtitle className="display-6  my-2">
            {word.sentence}
          </Card.Subtitle>
          <hr />
          <Card.Text
            className={hintForUser ? "mb-2 text-danger" : "mb-2 text-muted"}
          >
            {overdue}
          </Card.Text>
          <Button variant="outline-success" onClick={(e) => wordUpdate(word)}>
            Done
          </Button>{" "}
          <Button variant="outline-info" onClick={(e) => wordInfo(word)}>
            Word's info
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default WordCard;
