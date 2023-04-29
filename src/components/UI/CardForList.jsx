import React from "react";
import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";

const CardForList = ({ header, subtitle, list, mini }) => {
  return (
    <>
      {mini ? (
        <div className="info-plan">
          {list.map((el) => (
            <div>{el}</div>
          ))}
        </div>
      ) : (
        <Card>
          <Card.Body>
            <Card.Header as="h5">{header}</Card.Header>
            <Card.Subtitle className="display-6">{subtitle}</Card.Subtitle>
            <div className=" text-muted mt-2">
              <ListGroup variant="flush">
                {list.map((item, i) => (
                  <ListGroup.Item style={{ width: "max-content" }} key={i}>
                    <span
                      style={
                        item.hasOwnProperty("stylecss") ? item.stylecss : {}
                      }>
                      {item}
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default CardForList;
