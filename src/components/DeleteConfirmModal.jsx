import React from "react";

const DeleteConfirmationModal = ({ show, onClose, onDelete }) => {
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Are you sure?</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>If you delete this member, this action cannot be undone.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={onDelete}>
              Yes, delete it!
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
