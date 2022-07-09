import React from "react";
import Modal from "react-bootstrap/Modal";

const MyModal = ({
  children,
  visible,
  setVisible,
  title = "",
  subtitle = "",
  fullscreen,
}) => {
  return (
    <Modal
      fullscreen={fullscreen}
      dialogClassName={fullscreen ? "" : "modal-max"}
      show={visible}
      onHide={() => setVisible(false)}
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
