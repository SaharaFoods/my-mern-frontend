import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import UserList from "./components/UserList.jsx";
import UserForm from "./components/UserForm.jsx";

function App() {
  // 1. ডেটা স্টেটস
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [isEditing, setIsEditing] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const API_URL = "https://mern-user-api-39v1.onrender.com/api/users";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // নতুন ইউজার তৈরির ফাংশন (POST লজিক)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newName.length < 3) {
      alert("Name must be at least 3 characters long");
      return;
    }
    if (!emailRegex.test(newEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!newName || !newEmail) {
      alert("Name and Email are required");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        name: newName,
        email: newEmail,
      });

      // API থেকে পাওয়া নতুন ইউজারকে বর্তমান লিস্টে যুক্ত করা
      setUsers([...users, response.data]);

      // ইনপুট ফিল্ড খালি করা
      setNewName("");
      setNewEmail("");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  const handleEditStart = (user) => {
    setIsEditing(user._id); // এই ID এডিট হচ্ছে
    setEditName(user.name); // এডিটিং ফিল্ডে বর্তমান নাম সেট করা
    setEditEmail(user.email); // এডিটিং ফিল্ডে বর্তমান ইমেইল সেট করা
  };

  // ইউজার আপডেট (PUT/PATCH লজিক)
  const handleEditSave = async (id) => {
    if (editName.length < 3) {
      alert("Name must be at least 3 characters long");
      return;
    }

    if (!editEmail.includes("@") || !editEmail.includes(".")) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        name: editName,
        email: editEmail,
      });

      // লোকাল স্টেট আপডেট: সার্ভার থেকে ফেরত আসা আপডেটেড ইউজার দিয়ে রিপ্লেস করা
      setUsers(users.map((u) => (u._id === id ? response.data : u)));

      // এডিটিং মোড বন্ধ করা এবং ইনপুট ক্লিয়ার করা
      setIsEditing(null);
      setEditName("");
      setEditEmail("");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Check console for details.");
    }
  };

  // ইউজার ডিলিট করার ফাংশন (DELETE লজিক)
  const handleDelete = async (id) => {
    try {
      // ✨ ১. DELETE রিকোয়েস্ট: _id ব্যবহার করে ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
      await axios.delete(`${API_URL}/${id}`);

      // ✨ ২. স্টেট আপডেট: ডিলিট হওয়া ইউজারটিকে ফিল্টার করে বাদ দেওয়া
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // 2. ডেটা ফেচ করার লজিক (GET লজিক)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []); // খালি অ্যারে ([]), যাতে এটি শুধু একবার চলে

  return (
    <div className="App">
      <h1>MERN Stack User List</h1>

      {/* 3. POST ফর্ম */}
      <UserForm
        newName={newName}
        setNewName={setNewName}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        handleSubmit={handleSubmit}
      />

      <hr />
      {/* 4. ইউজার লিস্ট কম্পোনেন্ট */}
      <UserList
        users={users}
        handleDelete={handleDelete}
        handleEditStart={handleEditStart}
        handleEditSave={handleEditSave}
        isEditing={isEditing}
        editName={editName}
        setEditName={setEditName}
        editEmail={editEmail}
        setEditEmail={setEditEmail}
      />
    </div>
  );
}

export default App;
