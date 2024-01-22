import React from "react";
import "./modal.css";

const Modal = ({ isOpen, itemToDelete, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-content-header">Delete comment</h2>
        <p className="modal-content-body">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="modal-buttons-container">
          <button className="modal-btn cancel-modal-button" onClick={onCancel}>
            No, Cancel
          </button>
          <button className="modal-btn delete-modal-button" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
