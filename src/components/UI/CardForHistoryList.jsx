import React from "react";
import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";

const CardForHistoryList = ({ header, subtitle, list }) => {
  const stylecss = (item) => {
    if (item.includes("late")) return { color: "red", fontWeight: "600" };
    if (item.includes("skipped")) return { color: "orange", fontWeight: "600" };
    if (item.includes("new try")) return { color: "green", fontWeight: "600" };
    if (item.includes("add")) return { color: "green", fontWeight: "600" };
    return {};
  };
  return (
    <Card>
      <Card.Body>
        <Card.Header as="h5">{header}</Card.Header>
        <Card.Subtitle className="display-6">{subtitle}</Card.Subtitle>
        <div className=" text-muted mt-2">
          <ListGroup variant="flush">
            {list.map((item, i) => (
              <ListGroup.Item style={{ width: "max-content" }} key={i}>
                <span style={stylecss(item)}>{item}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardForHistoryList;
