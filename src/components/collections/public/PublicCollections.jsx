import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import PublicCollectionCard from "./PublicCollectionCard";
import MyInputGroup from "../../UI/input/MyInputGroup";
import MySpinner from "../../UI/MySpinner";
import { useQuery } from "../../../hooks/useQuery";
import BaseExtraAPI from "../../../API/BaseExtraAPI";

const PublicCollections = () => {
  const [collectionList, setCollectionList] = useState([]);
  const [filtredList, setFiltredList] = useState([]);
  const [filter, setFilter] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [getPublicCollectionList, isLoading, error] = useQuery(async () => {
    const col = await BaseExtraAPI.getPublicCollections();
    setCollectionList(col);
    setFiltredList(col);
  });

  useEffect(() => {
    getPublicCollectionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterList = () => {
    if (!filter.trim()) setFiltredList(collectionList);
    const res = collectionList.filter((item) => {
      if (item.collection.name.toLowerCase().includes(filter.toLowerCase()))
        return true;
      else
        return item.content.some(
          (elem) =>
            elem.question.toLowerCase().includes(filter.toLowerCase()) ||
            elem.answer.toLowerCase().includes(filter.toLowerCase()) ||
            elem.note.toLowerCase().includes(filter.toLowerCase())
        );
    });
    setFiltredList(res);
  };
  const clearFilter = () => {
    setFilter("");
    setFiltredList(collectionList);
  };
  return (
    <>
      <h1 className="display-1">Public collections</h1>

      <div className="w-50 d-inline-flex ">
        <MyInputGroup
          label="find:"
          value={filter}
          type="text"
          onKeyPress={(e) => {
            if (e.key === "Enter") filterList();
          }}
          onChange={(e) => {
            setFilter(e.target.value);
          }}>
          <Button onClick={filterList}>OK</Button>
          <Button onClick={clearFilter}>X</Button>
        </MyInputGroup>
      </div>
      <div className="d-flex p-2 flex-wrap justify-content-center">
        {isLoading ? (
          <MySpinner />
        ) : (
          filtredList.map((item) => (
            <PublicCollectionCard list={item} key={item.collection.id} />
          ))
        )}
      </div>
    </>
  );
};

export default PublicCollections;
