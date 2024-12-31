// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddMemberModal = ({ show, handleClose, member }) => {
//   const [loading, setLoading] = useState(false);

//   const handleCreateMember = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const formData = {
//       name: event.target.name.value,
//       email: event.target.email.value,
//       age: event.target.age.value,
//       parentId: event.target.parentId.value,
//     };

//     try {
//       const response = await fetch("https://crudcrud.com/api/18f25c85d7b2449284b425b051c4d594/member", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       toast.success("Member added successfully!");
//       setTimeout(() => handleClose(), 2000);
//     } catch (error) {
//       toast.error(`Failed to add member: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (member && member._id) {
//       console.log("Member ID:", member._id);
//     } else {
//       console.log("Creating a new member.");
//     }
//   }, [member]);


//   return (
//     <>
//       <ToastContainer position="bottom-right" autoClose={3000}/>
//       <Modal show={show} onHide={handleClose} className="modal-lg">
//         <Modal.Header closeButton>
//           {/* <Modal.Title>Add New Member</Modal.Title> */}
//           <Modal.Title>{member ? "Edit Member" : "Add New Member"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleCreateMember}>
//             <Form.Group controlId="name">
//               <Form.Label className="fw-bold">
//                 Member Name<span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Member Name"
//                 name="name"
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="email">
//               <Form.Label className="mt-3 fw-bold">
//                 Member Email<span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter Member Email"
//                 name="email"
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="age">
//               <Form.Label className="mt-3 fw-bold">
//                 Member Age<span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter Member Age"
//                 name="age"
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="parentId">
//               <Form.Label className="mt-3 fw-bold">Member Parent Id</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Parent Id"
//                 name="parentId"
//               />
//             </Form.Group>
//             <div className="d-flex justify-content-center mt-3">
//               <Button variant="success" type="submit" disabled={loading}>
//                 {/* {loading ? "Submitting..." : "Submit"} */}
//                 {member ? "Save" : "Submit"}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default AddMemberModal;


 
// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddMemberModal = ({ show, handleClose, member, add }) => {
//   const [memberData, setMemberData] = useState(null); // State to store API response

//   console.log(add, 'add');
//   // useEffect(() => {
//   //   const fetchMemberData = async () => {
//   //     if (!add && member && member._id) {
//   //       console.log("Fetching Member ID:", member._id);
//   //       try {
//   //         const response = await fetch(
//   //           `https://crudcrud.com/api/18f25c85d7b2449284b425b051c4d594/member/${member._id}`
//   //         );

//   //         if (!response.ok) {
//   //           throw new Error(`HTTP error! Status: ${response.status}`);
//   //         }

//   //         const result = await response.json();
//   //         console.log("Fetched Member Data:", result);
//   //         setMemberData(result); // Store the fetched member data
//   //       } catch (error) {
//   //         console.error("Error fetching member data:", error.message);
//   //         toast.error(`Error fetching member data: ${error.message}`);
//   //       }
//   //     } else {
//   //       console.log("Creating a new member.");
//   //     }
//   //   };

//   //   fetchMemberData();
//   // }, [member]);
//   useEffect(() => {
//     if (add) {
//       console.log("Add mode is enabled, skipping fetch.");
//       return; // Exit early if 'add' is true
//     }
  
//     const fetchMemberData = async () => {
//       if (member && member._id) {
//         console.log("Fetching Member ID:", member._id);
//         try {
//           const response = await fetch(
//             `https://crudcrud.com/api/18f25c85d7b2449284b425b051c4d594/member/${member._id}`
//           );
  
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
  
//           const result = await response.json();
//           console.log("Fetched Member Data:", result);
//           setMemberData(result); // Store the fetched member data
//         } catch (error) {
//           console.error("Error fetching member data:", error.message);
//           toast.error(`Error fetching member data: ${error.message}`);
//         }
//       }
//     };
  
//     fetchMemberData();
//   }, [member, add]); // Include 'add' in the dependency array
  

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const updatedMember = {
//       name: form.name.value,
//       email: form.email.value,
//       age: form.age.value,
//       parentId: form.parentId.value,
//     };

//     try {
//       if (member && member._id) {
//         // Update existing member
//         const response = await fetch(
//           `https://crudcrud.com/api/18f25c85d7b2449284b425b051c4d594/member/${member._id}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedMember),
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         toast.success("Member updated successfully!");
//       } else {
//         // Create new member
//         const response = await fetch(
//           "https://crudcrud.com/api/18f25c85d7b2449284b425b051c4d594/member",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedMember),
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         toast.success("Member added successfully!");
//       }

//       handleClose(); // Close the modal on success
//     } catch (error) {
//       console.error("Error submitting form:", error.message);
//       toast.error(`Error submitting form: ${error.message}`);
//     }
//   };

//   return (
//     <>
//       <ToastContainer position="bottom-right" autoClose={3000} />
//       <Modal show={show} onHide={handleClose} className="modal-lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{member ? "Edit Member" : "Add New Member"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="name">
//               <Form.Label className="fw-bold">
//                 Member Name<span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Member Name"
//                 name="name"
//                 defaultValue={memberData?.name || ""}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="email">
//               <Form.Label className="mt-3 fw-bold">
//                 Member Email<span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter Member Email"
//                 name="email"
//                 defaultValue={memberData?.email || ""}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="age">
//               <Form.Label className="mt-3 fw-bold">
//                 Member Age<span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter Member Age"
//                 name="age"
//                 defaultValue={memberData?.age || ""}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="parentId">
//               <Form.Label className="mt-3 fw-bold">Member Parent Id</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Parent Id"
//                 name="parentId"
//                 defaultValue={memberData?.parentId || ""}
//               />
//             </Form.Group>
//             <div className="d-flex justify-content-center mt-3">
//               <Button variant="success" type="submit">
//                 {member ? "Update" : "Submit"}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default AddMemberModal;


import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMemberModal = ({ show, handleClose, handleSubmit, member, add }) => {
  const [memberData, setMemberData] = useState(null); // State to store API response

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!add && member && member._id) { // Fetch only in edit mode
        console.log("Fetching Member ID:", member._id);
        try {
          const response = await fetch(
            `https://crudcrud.com/api/18f25c85d7b2449284b425b051c4d594/member/${member._id}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json();
          console.log("Fetched Member Data:", result);
          setMemberData(result); // Store the fetched member data
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
  console.log(add,'value of add');

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
