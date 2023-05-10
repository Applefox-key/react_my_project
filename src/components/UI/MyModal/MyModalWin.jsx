import React from "react";
import Modal from "react-bootstrap/Modal";
import cl from "./MyModal.module.scss";
const MyModalWin = ({
  children,
  showmodal,
  setshowmodal,
  title = "",
  subtitle = "",
  stylesubt,
  ...props
}) => {
  return (
    <div className={cl["modal-wrap"]}>
      <div className={cl["modal-main"]}></div>
    </div>
    // <Modal show={showmodal} onHide={() => setshowmodal(false)} {...props}>

    //   <Modal.Header closeButton>
    //     <Modal.Title>{title}</Modal.Title>
    //   </Modal.Header>

    //   <div className="d-flex justify-content-center align-items-center">
    //     {typeof subtitle === "object" ? (
    //       <div className="text-center w-100"> {subtitle}</div>
    //     ) : (
    //       <h5 className="text-center" style={stylesubt}>
    //         {subtitle}
    //       </h5>
    //     )}
    //   </div>

    //   <Modal.Body>{children}</Modal.Body>
    // </Modal>
  );
};

export default MyModalWin;

// width: max-content; */
//     /* max-width
