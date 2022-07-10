import React from "react";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import BaseAPI from "../API/BaseAPI";

const AvatarsList = ({ onChange }) => {
  const [avatarUrlList, setAvatarUrlList] = useState();

  useEffect(() => {
    setAvatarUrlList(BaseAPI.getAvatarUrlList());
  }, []);

  return (
    <div
      key="inline-radio"
      className="mb-3"
      onChange={(e) => {
        onChange(e.target.getAttribute("data-url"));
      }}
    >
      {avatarUrlList &&
        avatarUrlList.map((el, i) => (
          <Form.Check
            key={i}
            data-url={el}
            inline
            label={i + 1}
            name="group1"
            type="radio"
            id={"inline-radio-" + (i + 1)}
          />
        ))}
    </div>
  );
};

export default AvatarsList;
