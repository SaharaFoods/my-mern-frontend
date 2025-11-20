import React from "react";

const userForm = ({
  newName,
  setNewName,
  newEmail,
  setNewEmail,
  handleSubmit,
  
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter new user name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter new user email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default userForm;
