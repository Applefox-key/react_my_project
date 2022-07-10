import React, { useState, useEffect } from "react";
import BaseAPI from "../API/BaseAPI";
import UserAvatar from "../components/users/UserAvatar";
import WordList from "../components/words/WordsList";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Training = () => {
  const [collectionid, setCollectionid] = useState(-1);
  const [list, setList] = useState();
  const [collectionsList, setCollectionsList] = useState();

  const wordUpdate = (word) => {
    BaseAPI.updateWord(word.id);
    setList(list.filter((item) => word.id !== item.id));
  };

  useEffect(() => {
    console.log("effect DB UnreadWords");
    setList(BaseAPI.getUnreadWordsByCollection(collectionid));
  }, [collectionid]);

  useEffect(() => {
    setCollectionsList(BaseAPI.getCollections());
  }, []);

  return (
    <div style={{ marginTop: "5rem" }}>
      <UserAvatar />

      <h1 className="display-1 mb-5">Training</h1>

      {collectionsList ? (
        <div className="d-flex justify-content-center padding25">
          <InputGroup.Text> Collection</InputGroup.Text>
          <Form.Select
            onChange={(e) => {
              console.log(e.target.value);
              setCollectionid(e.target.value);
            }}
          >
            <option value={-1}>....Choose the collection</option>
            {collectionsList.map((el, i) => (
              <option value={el.id} key={i}>
                {el.name}
              </option>
            ))}
          </Form.Select>
        </div>
      ) : (
        <></>
      )}
      {!list ? (
        <h2>No words to read</h2>
      ) : (
        <WordList list={list} wordUpdate={wordUpdate} />
      )}
    </div>
  );
};

export default Training;
