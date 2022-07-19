import React, { useState, useEffect } from "react";
// import { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import BaseAPI from "../../../API/BaseAPI";
import PublicCollectionCard from "./PublicCollectionCard";
import MyInputGroup from "../../UI/input/MyInputGroup";
import MySpinner from "../../UI/MySpinner";
// import { PopupContext } from "../../../context";
import { useQuery } from "../../../hooks/useQuery";

const PublicCollections = () => {
  const [collectionList, setCollectionList] = useState([]);
  const [filtredList, setFiltredList] = useState([]);
  const [filter, setFilter] = useState("");
  // const { popupSetting, setPopupSettings } = useContext(PopupContext);

  const [getPublicCollectionList, isLoading, error] = useQuery(async () => {
    const col = await BaseAPI.getPublicCollectionAndExpressions();
    setCollectionList(col);
    setFiltredList(col);
  });

  useEffect(() => {
    getPublicCollectionList();
  }, []);

  const filterList = () => {
    if (!filter.trim()) setFiltredList(collectionList);
    const res = collectionList.filter((item) => {
      if (item.collection.name.toLowerCase().includes(filter.toLowerCase()))
        return true;
      else
        return item.expressions.some(
          (expression) =>
            expression.expression
              .toLowerCase()
              .includes(filter.toLowerCase()) ||
            expression.phrase.toLowerCase().includes(filter.toLowerCase())
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
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
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
