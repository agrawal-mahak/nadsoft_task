// import React, { useEffect, useState } from "react";
// import { Button, Table, Toast } from "react-bootstrap";
// import { FaTrash } from "react-icons/fa";
// import AddMemberModal from "./components/AddMemberModal";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "font-awesome/css/font-awesome.min.css";
// import DeleteConfirmationModal from "./components/DeleteConfirmModal";
// import { BiEdit } from "react-icons/bi";

// const App = () => {
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [currentMember, setCurrentMember] = useState(null);
//   const [members, setMembers] = useState([
//     {
//       id: 24,
//       name: "Qa Nadsoft",
//       email: "qa+upl-test-client-4@nadsoftdev.com",
//       age: 28,
//     },
//     {
//       id: 23,
//       name: "Qa Nadsoft",
//       email: "qa+upl-test-client-3@nadsoftdev.com",
//       age: 32,
//     },
//     { id: 15, name: "qa test", email: "qa+ertg@nadsoftdev.com", age: 36 },
//     { id: 4, name: "ts vb", email: "qa+721@nadsoftdev.com", age: 30 },
//   ]);

//   const [loading, setLoading] = useState(true); // State to manage loading state
//   const [data, setData] = useState([]);

//   const handleCloseCreateModal = () =>{
//     setShowCreateModal(false);
//     setCurrentMember(null);
//   }

//   const handleShowCreateModal = () => setShowCreateModal(true);

//   const handleShowEditModal = (member) => {
//     setCurrentMember(member); // Set the selected member as the current member
//     setShowCreateModal(true); // Open the modal
//   };

//   const handleCloseDeleteModal = () => setShowDeleteModal(false);
//   const handleShowDeleteModal = (member) => {
//     setCurrentMember(member);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteMember = () => {
//     setMembers(members.filter((member) => member.id !== currentMember.id));
//     setShowDeleteModal(false);
//   };

//   const handleCreateMember = (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const updatedMember = {
//       id: currentMember ? currentMember.id : Math.floor(Math.random() * 1000),
//       name: form.name.value,
//       email: form.email.value,
//       age: form.age.value,
//     };

//     if (currentMember) {
//       // Update existing member
//       setData(
//         data.map((member) =>
//           member.id === currentMember.id ? updatedMember : member
//         )
//       );
//     } else {
//       // Add new member
//       setData([...data, updatedMember]);
//     }

//     setShowCreateModal(false);
//     setCurrentMember(null); // Reset current member after submission
//   };

// useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('https://crudcrud.com/api/18f25c85d7b2449284b425b051c4d594/member');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const result = await response.json();
//                 setData(result);
//             } catch (error) {
//                 Toast.error(`Error fetching data: ${error.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     console.log(data,'data');
//   return (
//     <div className="container mt-5">
//       <h3>All Members</h3>
//       <div className="d-flex justify-content-between mb-3">
//         <div className="d-flex flex-grow-2">
//           <input type="text" className="form-control" placeholder="QA" />
//         </div>
//         <Button
//           variant="success"
//           onClick={handleShowCreateModal}
//           className="ms-5"
//         >
//           Add New Member
//         </Button>
//       </div>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th className="col-1">Id</th>
//             <th className="col-2">Member Name</th>
//             <th className="col-6">Member Email</th>
//             <th className="col-1">Age</th>
//             <th className="col-1">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((member) => (
//             <tr key={member._id}>
//               <td>{member._id}</td>
//               <td>{member.name}</td>
//               <td>{member.email}</td>
//               <td>{member.age}</td>
//               <td className="ps-3">
//                 <FaTrash
//                   variant="danger"
//                   style={{ color: "#d90707" }}
//                   onClick={() => handleShowDeleteModal(member)} // Open delete modal for this member
//                 />
//               <BiEdit size={20} className="text-primary ms-3"
//                  onClick={() => handleShowEditModal(member)}
//               />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Pagination */}
//       <div className="d-flex justify-content-between">
//         <div>Show 10 entries</div>
//         <nav>
//           <ul className="pagination">
//             <li className="page-item">
//               <button className="page-link">First</button>
//             </li>
//             <li className="page-item">
//               <button className="page-link">Previous</button>
//             </li>
//             <li className="page-item active">
//               <button className="page-link btn-success">1</button>
//             </li>
//             <li className="page-item">
//               <button className="page-link">Next</button>
//             </li>
//             <li className="page-item">
//               <button className="page-link">Last</button>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Create Member Modal */}
//       <AddMemberModal
//         show={showCreateModal}
//         handleClose={handleCloseCreateModal}
//         handleCreateMember={handleCreateMember}
//         member={currentMember} // Pass current member to modal
//         add={true}
//       />

//       {/* Edit member modal */}
//       <AddMemberModal
//         show={showCreateModal}
//         handleClose={handleCloseCreateModal}
//         handleCreateMember={handleCreateMember}
//         member={currentMember} // Pass current member to modal
//       />

//       {/* Delete Member Modal */}
//       <DeleteConfirmationModal
//         show={showDeleteModal}
//         handleClose={handleCloseDeleteModal}
//         handleDeleteMember={handleDeleteMember}
//       />
//     </div>
//   );
// };

// export default App;

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
  
  useEffect(() => {
    handleFetchData(); // Fetch data on initial render
  }, []);
  
  return (
    <div className="container mt-5">
      <h3>All Members</h3>
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex flex-grow-2">
          <input type="text" className="form-control" placeholder="Search" />
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
          {data.map((member) => (
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
                  // onClick={() => handleShowEditModal(member)}
                  onClick={() => handleShowEditModal(member)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between">
        <div>Show 10 entries</div>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link">First</button>
            </li>
            <li className="page-item">
              <button className="page-link">Previous</button>
            </li>
            <li className="page-item active">
              <button className="page-link btn-success">1</button>
            </li>
            <li className="page-item">
              <button className="page-link">Next</button>
            </li>
            <li className="page-item">
              <button className="page-link">Last</button>
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
