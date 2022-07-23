import React from "react";
import Card from "react-bootstrap/esm/Card";

import { useNavigate } from "react-router-dom";
import CollectionContentList from "../CollectionContentList";

const PublicCollectionCard = ({ list }) => {
  const router = useNavigate();
  return (
    <div
      className="mx-2 my-2 pointer"
      onClick={(e) => {
        router(`/public/${list.collection.id}/${list.collection.name}`);
      }}>
      <Card style={{ width: "18rem" }}>
        <Card.Header>{list.collection.name}</Card.Header>
        <CollectionContentList expressionsList={list.expressions} />
      </Card>
    </div>
  );
};

export default PublicCollectionCard;
