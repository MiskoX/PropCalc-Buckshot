import React from "react";
import "./Modal.css";

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Attention!</h2>
        <p>{message}</p>
        <button onClick={onClose} className="modal-button">
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
