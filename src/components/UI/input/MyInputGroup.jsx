import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const MyInputGroup = ({ children, text, ...props }) => {

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1"> {text}</InputGroup.Text>
      <Form.Control
        {...props}
        aria-label={props.placeholder}
        aria-describedby="basic-addon1"
      />
      {children}
    </InputGroup>
  );
};

export default MyInputGroup;