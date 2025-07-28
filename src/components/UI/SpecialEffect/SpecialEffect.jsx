import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import cl from "./SpecialEffect.module.scss";
import Confetti from "react-confetti";

const modalRoot = document.getElementById("modal-root") || document.body;

const SpecialEffect = ({ message = "Great job! Keep it up!", onClose }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1050 }}
        onClick={onClose}></div>

      <div
        className="modal d-block"
        tabIndex={-1}
        role="dialog"
        style={{ zIndex: 1051 }}
        aria-modal="true">
        <Confetti numberOfPieces={300} recycle={false} />
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content text-center p-4">
            <div className={cl.congrats}>
              <h2 className="text-success mb-3" style={{ fontWeight: "700" }}>
                🎉 Congratulations!
              </h2>
              <p className="lead mb-4">{message}</p>
              <button
                type="button"
                className="btn btn-success"
                onClick={onClose}
                autoFocus>
                Continue Training
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default SpecialEffect;
