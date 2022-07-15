import React from "react";
import Modal from "react-bootstrap/Modal";

const MyModal = ({ children, title = "", subtitle = "", ...props }) => {
  return (
    <Modal
      // fullscreen={props.fullscreen}
      // dialogClassName={props.fullscreen ? "" : "modal-max"}
      show={props.visible}
      onHide={() => props.setVisible(false)}
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <h5 className="d-flex flex-wrap justify-content-center">{subtitle}</h5>

      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default MyModal;

// width: max-content; */
//     /* max-width
