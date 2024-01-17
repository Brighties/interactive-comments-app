import React from "react";
import "./modal.css";

const Modal = ({ isOpen, itemToDelete, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this item?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
