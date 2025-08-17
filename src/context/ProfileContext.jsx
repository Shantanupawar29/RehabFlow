// src/context/ProfileContext.jsx
import { createContext, useState } from "react";

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [user, setUser] = useState({
    name: "Anushka Sharma",
    email: "anushka@example.com",
    avatar: "/assets/avatar.png",
    role: "Patient"
  });

  const [bookings, setBookings] = useState([
    { id: 1, service: "Therapeutic Ultrasound", date: "2025-08-20" },
    { id: 2, service: "Cupping Therapy", date: "2025-08-22" },
  ]);

  const updateProfile = (newData) => setUser({ ...user, ...newData });

  const addBooking = (booking) => setBookings([...bookings, booking]);

  return (
    <ProfileContext.Provider value={{ user, updateProfile, bookings, addBooking }}>
      {children}
    </ProfileContext.Provider>
  );
}
