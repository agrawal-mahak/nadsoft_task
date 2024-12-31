import React, { useEffect, useState } from "react";
import { Button, Table, Toast } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import AddMemberModal from "./components/AddMemberModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import DeleteConfirmationModal from "./components/DeleteConfirmModal";
import { BiEdit } from "react-icons/bi";


const App = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [data, setData] = useState([]);
  
  const [toast, setToast] = useState({
     show: false,
      message: "", 
      variant: "",
      color: "",
   });
  const [showModalAdd, setShowModalAdd] = useState({ show: false });
  const [showModalEdit, setShowModalEdit] = useState({ show: false, id: '' });

  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(10);
  const [paginatedData, setPaginatedData] = useState([]); 

  const [searchTerm, setSearchTerm] = useState("");

  const handleCloseModal = () => {
    setCurrentMember(null);
    setShowModalAdd({ show: false });
    setShowModalEdit({show: false});
  };

  const handleShowCreateModal = () => {
    setShowModalAdd({ show: true });
  };

  const handleShowEditModal = (member) => {
    setCurrentMember(member);
    setShowModalEdit({ show: true, id: member._id });
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleShowDeleteModal = (member) => {
    setCurrentMember(member);
    setShowDeleteModal(true);
  };

  const handleDeleteMember = async () => {
    try {
      await fetch(
        `https://crudcrud.com/api/536cb28226444df9b32c64c91d01a23a/member/${currentMember._id}`,
        { method: "DELETE" }
      );
      setData(data.filter((member) => member._id !== currentMember._id));
      setToast({ show: true, message: "Member deleted successfully!", variant: "success",  color: "white", });
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting member:", error.message);
      setToast({ show: true, message: `Error deleting member: ${error.message}`, variant: "danger",  color: "white", });
    }
  };

  const handleCreateOrUpdateMember = async (event, memberData) => {
    event.preventDefault();
  
    // Prepare the updated member data from the form
    const form = event.target;
    const updatedMember = {
      name: form.name.value,
      email: form.email.value,
      age: form.age.value,
      parentId: form.parentId.value,
    };
  
    try {
      if (memberData && memberData._id) {
        // Update existing member using PUT
        const response = await fetch(
          `https://crudcrud.com/api/536cb28226444df9b32c64c91d01a23a/member/${memberData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMember),
          }
        );
  
        if (!response.ok) {
          throw new Error(`Failed to update member. Status: ${response.status}`);
        }
  
       setToast({ show: true, message: "Member updated successfully!", variant: "success", color: "white", });
       handleCloseModal(); 
      handleFetchData(); // Fetch updated list of members
      } else {
        // Create new member using POST
        const response = await fetch(
          "https://crudcrud.com/api/536cb28226444df9b32c64c91d01a23a/member",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMember),
          }
        );
  
        if (!response.ok) {
          throw new Error(`Failed to create member. Status: ${response.status}`);
        }
  
        const newMember = await response.json();
        setData((prevData) => [...prevData, newMember]); // Update the state with the new member
        setToast({ show: true, message: "Member added successfully!", variant: "success",  color: "white", });
      }
  
      handleCloseModal();
      handleFetchData();
      
    } catch (error) {
      console.error("Error:", error.message);
      setToast({ show: true, message: `Error: ${error.message}`, variant: "danger", color: "white", });
    }
  };

  const handleFetchData = async () => {
    try {
      const response = await fetch(
         "https://crudcrud.com/api/536cb28226444df9b32c64c91d01a23a/member"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setToast({ show: true, message: `Error fetching data: ${error.message}`, variant: "danger", color: "white", });
    }
  };

   // search
   const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update search term
  };

  const filteredData = data.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.age.toString().includes(searchTerm) ||
      member._id.includes(searchTerm)
  );

  // pagination
    useEffect(() => {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      setPaginatedData(filteredData.slice(indexOfFirstItem, indexOfLastItem));
    }, [filteredData, currentPage, itemsPerPage]);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    useEffect(() => {
      handleFetchData(); 
    }, []);
  
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container mt-5">
      <h3>All Members</h3>
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex flex-grow-2">
          <input 
          type="text" 
          className="form-control" 
          placeholder="QA"
          value={searchTerm}
          onChange={handleSearch} />
        </div>
        <Button
          variant="success"
          onClick={handleShowCreateModal}
          className="ms-5"
        >
          Add New Member
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="col-1">Id</th>
            <th className="col-2">Member Name</th>
            <th className="col-6">Member Email</th>
            <th className="col-1">Age</th>
            <th className="col-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((member) => (
            <tr key={member._id}>
              <td>{member._id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.age}</td>
              <td className="ps-3">
                <FaTrash
                  variant="danger"
                  style={{ color: "#d90707" }}
                  onClick={() => handleShowDeleteModal(member)}
                />
                <BiEdit
                  size={20}
                  className="text-primary ms-3"
                  onClick={() => handleShowEditModal(member)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>Showing {itemsPerPage} entries per page</div>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 && "active"
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages && "disabled"
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
            <li
              className={`page-item ${
                currentPage === totalPages && "disabled"
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </li>
          </ul>
        </nav>
      </div>


      {/* Add Member Modal */}
      {!!showModalAdd.show && (
        <AddMemberModal
          show={showModalAdd.show}
          handleClose={() => setShowModalAdd({ show: false })}
          handleSubmit={handleCreateOrUpdateMember} 
          member={null}
          add={true}
        />
      )}

      {/* Edit Member Modal */}
      {!!showModalEdit.show && (
        <AddMemberModal
          show={showModalEdit.show}
          handleClose={() => setShowModalEdit({ show: false, id: '' })}
          handleSubmit= {handleCreateOrUpdateMember} 
          member={data.find((member) => member._id === showModalEdit.id)}
          add={false}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDeleteMember={handleDeleteMember}
      />

       {/* Toast Notification */}
       <Toast
        onClose={() => setToast({ ...toast, show: false })}
        show={toast.show}
        delay={3000}
        autohide
        bg={toast.variant}
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body  style={{ color: toast.color, fontWeight: "bold" }}>{toast.message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default App;
