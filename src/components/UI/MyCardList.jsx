import React from "react";
import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";

const MyCardList = ({ header, subtitle, list }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Header as="h5">{header}</Card.Header>
        <Card.Subtitle className="display-6">{subtitle}</Card.Subtitle>
        <div className=" text-muted">
          <ListGroup variant="flush">
            {list.map((item, i) => (
              <ListGroup.Item key={i}>{item}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MyCardList;
