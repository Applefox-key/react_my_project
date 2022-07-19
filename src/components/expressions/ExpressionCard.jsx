import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Badge from "react-bootstrap/Badge";

const ExpressionCard = ({ expression, expressionUpdate, expressionInfo }) => {
  const [hintForUser, overdue] = expression.hintForReading;

  return (
    <>
      <Card className="my-4 " style={{ width: "90%" }}>
        <div className="pb-2">
          <Card.Header className="text-lg-start" as="h5">
            {expression.expression}
          </Card.Header>
          <Card.Subtitle className="display-6  my-2">
            {expression.phrase}
          </Card.Subtitle>
          <Card.Text className={"mb-2 text-" + overdue ? "danger" : "muted"}>
            {hintForUser}
          </Card.Text>
          <Button variant="outline-info" onClick={(e) => expressionUpdate(expression)}>
            {overdue && <Badge bg="danger">!</Badge>} has been read
          </Button>{" "}
          <Button variant="outline-info" onClick={(e) => expressionInfo(expression)}>
            Expression's info
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ExpressionCard;
