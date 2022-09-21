import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";

const MyInput = ({ name, content, callback = null, onblur }) => {
  const [value, setValue] = useState(content);

  return (
    <Form.Control
      autoFocus
      aria-label={name}
      value={value}
      onBlur={onblur}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onChange={(e) => {
        e.stopPropagation();
        setValue(e.target.value);
        callback(e);
      }}
      aria-describedby="basic-addon1"
    />
  );
};

export default MyInput;
