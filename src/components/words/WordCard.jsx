import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Badge from "react-bootstrap/Badge";

const WordCard = ({ word, wordUpdate, wordInfo }) => {
  const [hintForUser, overdue] = word.hintForReading;

  return (
    <>
      <Card className="my-4 " style={{ width: "90%" }}>
        <div className="pb-2">
          <Card.Header className="text-lg-start" as="h5">
            {word.word}
          </Card.Header>
          <Card.Subtitle className="display-6  my-2">
            {word.sentence}
          </Card.Subtitle>
          <Card.Text className={"mb-2 text-" + overdue ? "danger" : "muted"}>
            {hintForUser}
          </Card.Text>
          <Button variant="outline-info" onClick={(e) => wordUpdate(word)}>
            {overdue && <Badge bg="danger">!</Badge>} has been read
          </Button>{" "}
          <Button variant="outline-info" onClick={(e) => wordInfo(word)}>
            Word's info
          </Button>
        </div>
      </Card>
    </>
  );
};

export default WordCard;
