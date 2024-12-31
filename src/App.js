import React, { useEffect, useState } from "react";
import { Button, Toast } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import AddMemberModal from "./components/AddMemberModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import DeleteConfirmationModal from "./components/DeleteConfirmModal";
import { BiEdit } from "react-icons/bi";
import { addMember, deleteMember, fetchMembers, updateMember } from "./api";
import DataTable from "react-data-table-component";

const App = () => {
  const [data, setData] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "",
    color: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState({ show: false });
  const [showModalEdit, setShowModalEdit] = useState({ show: false, id: "" });
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(10);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginatedData, setPaginatedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      name: "Id",
      selector: (row) => row._id,
      sortable: true,
      width: "20%",
    },
    {
      name: "Member Name",
      selector: (row) => row.name,
      sortable: true,
      width: "15%",
    },
    {
      name: "Member Email",
      selector: (row) => row.email,
      sortable: true,
      width: "45%",
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
      width: "10%",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="action-icons">
          {/* Delete Icon */}
          <FaTrash
            style={{ color: "#d90707", cursor: "pointer", marginRight: "10px" }}
            onClick={() => handleShowDeleteModal(row)}
            title="Delete Member"
          />
          {/* Edit Icon */}
          <BiEdit
            size={20}
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => handleShowEditModal(row)}
            title="Edit Member"
          />
        </div>
      ),
      width: "15%",
    },
  ];

  const handleFetchData = async () => {
    try {
      const result = await fetchMembers();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setToast({
        show: true,
        message: `Error fetching data: ${error.message}`,
        variant: "danger",
        color: "white",
      });
    }
  };

  const handleCreateOrUpdateMember = async (event, memberData) => {
    event.preventDefault();

    const form = event.target;
    const updatedMember = {
      name: form.name.value,
      email: form.email.value,
      age: form.age.value,
      parentId: form.parentId.value,
    };

    try {
      if (memberData && memberData._id) {
        // Update existing member
        const response = await updateMember(memberData._id, updatedMember);
        if (response) {
          setToast({
            show: true,
            message: "Member updated successfully with a response!",
            variant: "success",
            color: "white",
          });
        } else {
          setToast({
            show: true,
            message: "Member updated successfully!",
            variant: "success",
            color: "white",
          });
        }
      } else {
        // Add new member
        const newMember = await addMember(updatedMember);
        setData((prevData) => [...prevData, newMember]);
        setToast({
          show: true,
          message: "Member added successfully!",
          variant: "success",
          color: "white",
        });
      }
      handleCloseModal();
      handleFetchData();
    } catch (error) {
      console.error("Error:", error.message);
      setToast({
        show: true,
        message: `Error: ${error.message}`,
        variant: "danger",
        color: "white",
      });
    }
  };

  const handleDeleteMember = async () => {
    try {
      await deleteMember(currentMember._id);
      setToast({
        show: true,
        message: "Member deleted successfully!",
        variant: "success",
        color: "white",
      });
      setShowDeleteModal(false);
      handleFetchData();
    } catch (error) {
      console.error("Error deleting member:", error.message);
      setToast({
        show: true,
        message: `Error deleting member: ${error.message}`,
        variant: "danger",
        color: "white",
      });
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  //------------------------------- -------search
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

  // ---------------------------------------pagination
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setPaginatedData(filteredData.slice(indexOfFirstItem, indexOfLastItem));
  }, [filteredData, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleCloseModal = () => {
    setCurrentMember(null);
    setShowModalAdd({ show: false });
    setShowModalEdit({ show: false });
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
            onChange={handleSearch}
          />
        </div>
        <Button
          variant="success"
          onClick={handleShowCreateModal}
          className="ms-5"
        >
          Add New Member
        </Button>
      </div>

      <DataTable
        title="Members List"
        columns={columns}
        data={paginatedData}
        highlightOnHover
        striped
        responsive
        customStyles={{
          table: {
            style: {
              border: "1px solid #ddd", // Add border around the table
              overflowX: "hidden",
            },
          },
          rows: {
            style: {
              fontSize: "16px", // Adjust the font size for rows
            },
          },
          headCells: {
            style: {
              fontWeight: "bold", // Make the font bold
              fontSize: "16px", // Optional: Adjust font size
            },
          },
        }}
      />
    

      {/* Pagination */}
      {/* <div className="d-flex justify-content-between align-items-center mt-4">
        <div>Showing {itemsPerPage} entries</div>
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
                className={`page-item ${currentPage === index + 1 && "active"}`}
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
      </div> */}

      <div className="d-flex justify-content-between align-items-center mt-4">
  {/* Dropdown for items per page */}
  <div className="d-flex align-items-center">
    <span className="me-2">Show</span>
    <select
      className="form-select w-auto"
      value={itemsPerPage}
      onChange={(e) => setItemsPerPage(Number(e.target.value))}
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={50}>50</option>
    </select>
    <span className="ms-2">entries</span>
  </div>

  {/* Pagination */}
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
          className={`page-item ${currentPage === index + 1 && "active"}`}
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
          handleClose={() => setShowModalEdit({ show: false, id: "" })}
          handleSubmit={handleCreateOrUpdateMember}
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
        <Toast.Body style={{ color: toast.color, fontWeight: "bold" }}>
          {toast.message}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default App;
