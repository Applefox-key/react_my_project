import React from "react";
import cl from "../toast/MyToast.module.css";

const MyToast = ({ show, setShow, message, variant = "success" }) => {
  if (show)
    setTimeout(() => {
      setShow(false);
    }, 5000);

  return show ? (
    <div className={[cl.toast, cl[variant]].join(" ")}>{message}</div>
  ) : (
    <div className={cl.empty} />
  );
};

export default MyToast;
