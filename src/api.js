const API_BASE_URL = 'https://crudcrud.com/api/fba3073543714f6b963ca12da343ab99/member'
//   "https://crudcrud.com/api/536cb28226444df9b32c64c91d01a23a/member";
  // "https://crudcrud.com/api/3b2fcb287b6d437288c90210e5e5bfa1/member";
  // 'https://crudcrud.com/api/79ed62c9198f40b68197a79fdb6cf4ad/member'
  // 'https://crudcrud.com/api/b0fac95fc47f43f88a9aacbb1456c29c/member'
  


// --------------------------------Fetch all members
export const fetchMembers = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

// ---------------------------------Add a new member
export const addMember = async (member) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });
  if (!response.ok) {
    throw new Error(`Failed to create member. Status: ${response.status}`);
  }
  return response.json();
};

// -------------------------------Update an existing member
export const updateMember = async (id, member) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to update member. Status: ${response.status}`);
    }
  
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json(); 
    }
  
    return null; 
  };
  

// ----------------------------Delete a member
export const deleteMember = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`Failed to delete member. Status: ${response.status}`);
  }
};

// --------------------Fetch a single member by ID
export const fetchMemberById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};
