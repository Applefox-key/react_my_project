import React from "react";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import BaseAPI from "../API/BaseAPI";
import MySelect from "./UI/MySelect";
import imgProfile from "../img/profile.ico";

const AvatarsList = ({ onChange }) => {
  const [avatarUrlList, setAvatarUrlList] = useState();

  useEffect(() => {
    setAvatarUrlList(BaseAPI.getAvatarUrlList());
  }, []);

  return (
    <div>
      {avatarUrlList && (
        <MySelect
          defaultOption={{ name: "Choose an avatar", url: imgProfile }}
          onChange={(e) => {
            console.log(e.target.value);
            onChange(e.target.value);
          }}
          optionslist={avatarUrlList}
          val="url"
          text="name"
        />
      )}
      <div
        key="inline-radio"
        className="mb-3"
        onChange={(e) => {
          console.log(e.target.getAttribute("data-url"));
          onChange(e.target.getAttribute("data-url"));
        }}
      ></div>
    </div>
  );
};

export default AvatarsList;
