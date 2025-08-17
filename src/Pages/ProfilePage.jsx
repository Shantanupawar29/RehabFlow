// src/Pages/ProfilePage.jsx
import React, { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";

const ProfilePage = () => {
  const { user, updateProfile, bookings } = useContext(ProfileContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    updateProfile({ name, email });
    setEditMode(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      {/* User Info */}
      <div className="mb-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 rounded-full shadow-lg"
        />

        {editMode ? (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-64"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-64"
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500">{user.role}</p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Past Bookings */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Past Bookings</h2>
        <ul className="list-disc pl-6">
          {bookings.map((b) => (
            <li key={b.id}>
              {b.service} on {b.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
