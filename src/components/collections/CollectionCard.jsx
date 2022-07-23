import React from "react";
import Card from "react-bootstrap/esm/Card";
import { useNavigate } from "react-router-dom";
import CollectionContentList from "./CollectionContentList";

const CollectionCard = ({ collection }) => {
  const router = useNavigate();

  return (
    <div
      className="mx-2 my-2 pointer"
      onClick={(e) => {
        router(
          `/collections/${collection.collection.id}/${collection.collection.name}`
        );
      }}>
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          {collection.collection.name}{" "}
          {/* {countUnread ? <Badge bg="success">{countUnread}</Badge> : <></>} */}
        </Card.Header>
        <CollectionContentList content={collection.content} />
      </Card>
    </div>
  );
};

export default CollectionCard;
//  <Badge bg="secondary">New</Badge>
