import React, { useEffect, useState } from "react";
import BaseAPI from "../../API/BaseAPI";
import Card from "react-bootstrap/esm/Card";

import { useNavigate } from "react-router-dom";
import CollectionWords from "./CollectionWords";
import MySpinner from "../UI/MySpinner";
import { useQuery } from "../../hooks/useQuery";

const CollectionCard = ({ collection }) => {
  const [wordsList, setwordsList] = useState();
  const router = useNavigate();

  const [getWordsList, isLoading, error] = useQuery(async () => {
    const words = await BaseAPI.getWordsByCollectionAll(collection.id);
    setwordsList(words);
  });

  useEffect(() => {
    getWordsList();
  }, [collection]);

  return (
    <div
      className="mx-2 my-2 pointer"
      onClick={(e) => {
        router(`/collections/${collection.id}/${collection.name}`);
      }}
    >
      <Card style={{ width: "18rem" }}>
        <Card.Header>{collection.name}</Card.Header>
        {isLoading ? <MySpinner /> : <CollectionWords wordsList={wordsList} />}
      </Card>
    </div>
  );
};

export default CollectionCard;
