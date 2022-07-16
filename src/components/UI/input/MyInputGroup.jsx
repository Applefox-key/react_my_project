import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const MyInputGroup = ({ children, label, ...props }) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text> {label}</InputGroup.Text>
      <Form.Control {...props} aria-label={props.placeholder} />

      {children}
    </InputGroup>
  );
};

export default MyInputGroup;
