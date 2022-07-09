import React, { useEffect, useState } from "react";
import BaseAPI from "../../API/BaseAPI";
import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ collection }) => {
  const [wordsList, setwordsList] = useState();
  const router = useNavigate();

  useEffect(() => {
    setwordsList(BaseAPI.getWordsByCollectionAll(collection.id));
  }, []);

  return (
    <div
      className="mx-2 my-2 pointer"
      onClick={(e) => {
        router(`/collections/${collection.id}/${collection.name}`);
      }}
    >
      <Card style={{ width: "18rem" }}>
        <Card.Header>{collection.name}</Card.Header>
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
      </Card>
    </div>
  );
};

export default CollectionCard;
