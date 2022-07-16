import React from "react";
import Card from "react-bootstrap/esm/Card";
import { useNavigate } from "react-router-dom";
import { wordsCounter } from "../../utils/wordsCounter";
import CollectionWords from "./CollectionWords";
import Badge from "react-bootstrap/Badge";

const CollectionCard = ({ collection }) => {
  const router = useNavigate();
  const countUnread = wordsCounter(collection.words);
  console.log(countUnread);
  return (
    <div
      className="mx-2 my-2 pointer"
      onClick={(e) => {
        router(
          `/collections/${collection.collection.id}/${collection.collection.name}`
        );
      }}
    >
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          {collection.collection.name}{" "}
          {countUnread ? <Badge bg="success">{countUnread}</Badge> : <></>}
        </Card.Header>
        <CollectionWords wordsList={collection.words} />
      </Card>
    </div>
  );
};

export default CollectionCard;
//  <Badge bg="secondary">New</Badge>
