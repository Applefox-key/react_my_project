import React from "react";
import Modal from "react-bootstrap/Modal";
import cl from "./MyModal.module.scss";
const MyModal = ({
  children,
  showmodal,
  setshowmodal,
  title = "",
  subtitle = "",
  stylesubt,
  ...props
}) => {
  return (
    <Modal
      show={showmodal}
      onHide={() => setshowmodal(false)}
      {...props}
      className={cl.color}>
      <Modal.Header closeButton className={cl.header}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <div className={cl.subtitle}>
        {typeof subtitle === "object" ? (
          <div className="text-center w-100"> {subtitle}</div>
        ) : (
          <h5 className="text-center" style={stylesubt}>
            {subtitle}
          </h5>
        )}
      </div>

      <Modal.Body className={cl.color}>{children}</Modal.Body>
    </Modal>
  );
};

export default MyModal;

// width: max-content; */
//     /* max-width
