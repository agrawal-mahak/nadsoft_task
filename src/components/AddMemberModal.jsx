import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchMemberById } from "../api";

const AddMemberModal = ({ show, handleClose, handleSubmit, member, add }) => {
  const [memberData, setMemberData] = useState(null); // State to store API response

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!add && member && member._id) {
        try {
          const result = await fetchMemberById(member._id); // Use the API function
          setMemberData(result);
        } catch (error) {
          console.error("Error fetching member data:", error.message);
          toast.error(`Error fetching member data: ${error.message}`);
        }
      } else {
        setMemberData(null); // Reset member data for Add mode
      }
    };

    fetchMemberData();
  }, [member, add]);
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Modal show={show} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>{add ? "Add New Member" : "Edit Member"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e, memberData)}>
            <Form.Group controlId="name">
              <Form.Label className="fw-bold">
                Member Name<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Member Name"
                name="name"
                defaultValue={memberData?.name || ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label className="mt-3 fw-bold">
                Member Email<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Member Email"
                name="email"
                defaultValue={memberData?.email || ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="age">
              <Form.Label className="mt-3 fw-bold">
                Member Age<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Member Age"
                name="age"
                defaultValue={memberData?.age || ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="parentId">
              <Form.Label className="mt-3 fw-bold">Member Parent Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Parent Id"
                name="parentId"
                defaultValue={memberData?.parentId || ""}
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-3">
              <Button variant="success" type="submit">
                {add ? "Add Member" : "Update Member"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddMemberModal;
