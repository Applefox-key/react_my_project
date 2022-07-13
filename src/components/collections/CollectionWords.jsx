import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const CollectionWords = ({ wordsList }) => {
  return (
    <ListGroup variant="flush">
      {!wordsList ? (
        <ListGroup.Item>No words</ListGroup.Item>
      ) : (
        <>
          {wordsList.slice(0, 5).map((item) => (
            <ListGroup.Item key={item.id}>{item.word}</ListGroup.Item>
          ))}

          {wordsList.length > 5 ? (
            <ListGroup.Item variant="secondary" className="text-lg-end">
              {wordsList.length}...({wordsList.length - 5})
            </ListGroup.Item>
          ) : (
            <> </>
          )}
        </>
      )}
    </ListGroup>
  );
};

export default CollectionWords;
