import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddMemberModal from "./AddMemberModal";
import DeleteConfirmationModal from "./DeleteConfirmModal";
import { Button } from "bootstrap";

const Page = () => {
  const [members, setMembers] = useState([
    {
      id: 24,
      name: "Qa Nadsoft",
      email: "qa+upl-test-client-4@nadsoftdev.com",
      age: 28,
    },
    {
      id: 23,
      name: "Qa Nadsoft",
      email: "qa+upl-test-client-3@nadsoftdev.com",
      age: 32,
    },
    { id: 15, name: "qa test", email: "qa+ertg@nadsoftdev.com", age: 36 },
    { id: 4, name: "ts vb", email: "qa+721@nadsoftdev.com", age: 30 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    age: "",
    parentId: "",
  });

  const handleDelete = () => {
    setMembers(members.filter((member) => member.id !== memberToDelete));
    setShowDeleteModal(false);
  };

  const handleAddMember = () => {
    const newId = Math.max(...members.map((member) => member.id), 0) + 1;
    setMembers([...members, { ...newMember, id: newId }]);
    setNewMember({ name: "", email: "", age: "", parentId: "" });
    setShowAddModal(false);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h4>All Members</h4>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-success"
          onClick={() => setShowAddModal(true)}
        >
          Add New Member
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Member Name</th>
            <th>Member Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.age}</td>
              <td>
                {/* <button
                  className="btn btn-danger"
                  onClick={() => {
                    setMemberToDelete(member.id);
                    setShowDeleteModal(true);
                  }}
                >
                  🗑
                </button> */}
                <button type="button" class="btn btn-danger">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
              <button className="page-link">1</button>
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

      <AddMemberModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddMember}
        newMember={newMember}
        setNewMember={setNewMember}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Page;
