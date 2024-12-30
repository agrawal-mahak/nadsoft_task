import React from "react";
// import './styles.css'; // Import the CSS file

const AddMemberModal = ({ show, onClose, onSubmit, newMember, setNewMember }) => {
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      {/* <div className="modal-backdrop fade show" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}> */}
      
      <div className="modal-dialog" style={{ maxWidth: '70%' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Member</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label style={{ textAlign :'left'}}>Member Name*</label>
              <input
                type="text"
                className="form-control"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>Member Email*</label>
              <input
                type="email"
                className="form-control"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>Member Age*</label>
              <input
                type="number"
                className="form-control"
                value={newMember.age}
                onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>Member Parent ID</label>
              <input
                type="text"
                className="form-control"
                value={newMember.parentId}
                onChange={(e) => setNewMember({ ...newMember, parentId: e.target.value })}
              />
            </div>
          </div>
          <div className="modal-footer" alignItems={'center'}>
            <button type="button" className="btn btn-success" onClick={onSubmit}  >
              Submit
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      </div>
       
    // </div>
  );
};

export default AddMemberModal;
