// src/components/UserList.jsx
import React from "react";
import UserItem from "./UserItem"; // ✨ এটি ইম্পোর্ট করা হলো

const UserList = ({
  users,
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
    <div>
      <h2>Existing Users</h2>
      <ul>
        {users.map((user) => (
          // ✨ এখন শুধু UserItem কম্পোনেন্ট ব্যবহার করা হচ্ছে
          <UserItem
            key={user._id}
            user={user} // প্রতিটি ইউজার অবজেক্ট পাস করা হলো
            handleDelete={handleDelete}
            handleEditStart={handleEditStart}
            handleEditSave={handleEditSave}
            isEditing={isEditing}
            editName={editName}
            setEditName={setEditName}
            editEmail={editEmail}
            setEditEmail={setEditEmail}
          />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
