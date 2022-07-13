import React from "react";
import Toast from "react-bootstrap/Toast";

const MyToast = ({ show, setShow, ...props }) => {
  return (
    <Toast
      delay={3000}
      bg={props.bg}
      autohide={props.autohide}
      show={show}
      onClose={() => {
        setShow(false);
      }}
    >
      <Toast.Header>
        {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
        <strong className="me-auto">{props.header}</strong>
        <small>{props.smalltext}</small>
      </Toast.Header>
      <Toast.Body>{props.message}</Toast.Body>
    </Toast>
  );
};

export default MyToast;
