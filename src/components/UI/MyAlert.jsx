import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

const MyAlert = ({ show, setShow, ...props }) => {
  if (show) {
    return (
      <Alert variant={props.variant} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{props.header}</Alert.Heading>
        <p>{props.message}</p>
      </Alert>
    );
  }
  return <></>;
};

export default MyAlert;
