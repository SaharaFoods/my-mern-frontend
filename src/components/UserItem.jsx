import React from "react";

const UserItem = ({
  user,
  handleDelete,
  handleEditStart,
  handleEditSave,
  isEditing,
  editName,
  setEditName,
  editEmail,
  setEditEmail,
}) => {
  return (
    <li key={user._id}>
      {isEditing === user._id ? ( // যদি এই ইউজার এডিট হচ্ছে (এডিটিং মোড)
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditSave(user._id);
          }}
        >
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
          <button type="submit">Save</button>
          <button onClick={() => handleEditStart(null)}>Cancel </button>
        </form>
      ) : (
        // যদি এডিট না হয় (সাধারণ মোড)
        <>
          <strong>{user.name}</strong> ({user.email})
          {/* ✨ এখানে Edit বাটনটি যুক্ত হলো ✨ */}
          <button onClick={() => handleEditStart(user)}>Edit</button>
          <button onClick={() => handleDelete(user._id)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default UserItem;
