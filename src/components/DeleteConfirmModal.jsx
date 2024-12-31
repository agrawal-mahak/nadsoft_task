import React from "react";
import { Modal, Button } from "react-bootstrap";
import { PiWarningCircleDuotone } from "react-icons/pi";

const DeleteConfirmationModal = ({ show, handleClose, handleDeleteMember }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="d-flex flex-column align-items-center mt-4">
        <PiWarningCircleDuotone style={{ color: "orange", fontSize: "8rem" }} />
        <Modal.Title className="mt-1 text-center">
          Are you sure?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p  className="fs-5">If you delete this Member, This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={handleDeleteMember} className="px-4 py-2">
          Yes, delete it!
        </Button>
        <Button variant="danger" onClick={handleClose} className="px-4 py-2">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
