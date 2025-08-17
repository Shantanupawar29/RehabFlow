import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";
import { CSVLink } from "react-csv";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  // State management
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rescheduleBooking, setRescheduleBooking] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [rescheduleError, setRescheduleError] = useState("");

  // Services list
  const services = useMemo(
    () => [
      "Therapeutic Ultrasound",
      "Cupping Therapy",
      "Myofascial Release",
      "Hand Therapy",
      "Interferential Therapy (IFT)",
      "Trigger Point Release",
    ],
    []
  );

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, [fetchBookings]);

  // Dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  // Email functions
  const sendBookingEmail = async (bookingId, type) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/bookings/${bookingId}/send-email`,
        { type }
      );
      return res.data;
    } catch (err) {
      console.error("Email error:", err.response?.data || err.message);
      throw err;
    }
  };

  // Booking actions
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    
    try {
      await sendBookingEmail(id, "deleted");
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      await fetchBookings();
      alert("Appointment deleted and email sent!");
    } catch (err) {
      console.error(err);
      alert(`Failed to delete: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, { status: "Confirmed" });
      await sendBookingEmail(id, "confirmed");
      await fetchBookings();
      alert("Appointment confirmed and email sent!");
    } catch (err) {
      console.error("Confirmation error:", err);
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleReschedule = async () => {
    if (!rescheduleBooking || !newDate || !newTime) {
      setRescheduleError("Please select both date and time");
      return;
    }

    try {
      setIsRescheduling(true);
      setRescheduleError("");

      const formattedDate = new Date(newDate).toISOString().split('T')[0];
      
      await axios.put(
        `http://localhost:5000/api/bookings/${rescheduleBooking._id}`,
        { 
          date: formattedDate, 
          time: newTime,
          status: "Rescheduled" 
        }
      );

      await sendBookingEmail(rescheduleBooking._id, "rescheduled");
      await fetchBookings();
      
      alert("Appointment rescheduled successfully!");
      setRescheduleBooking(null);
      setNewDate("");
      setNewTime("");
    } catch (err) {
      console.error("Reschedule error:", err);
      setRescheduleError(err.response?.data?.message || "Failed to reschedule");
    } finally {
      setIsRescheduling(false);
    }
  };

  // Filter bookings
  const filteredBookings = useMemo(() => {
    let data = [...bookings];

    if (search) {
      const searchTerm = search.toLowerCase();
      data = data.filter(
        (b) =>
          b.name.toLowerCase().includes(searchTerm) ||
          b.email.toLowerCase().includes(searchTerm) ||
          b.phone.includes(search)
      );
    }

    if (selectedServices.length > 0) {
      data = data.filter((b) => selectedServices.includes(b.service));
    }

    if (startDate) data = data.filter((b) => new Date(b.date) >= new Date(startDate));
    if (endDate) data = data.filter((b) => new Date(b.date) <= new Date(endDate));

    return data;
  }, [search, selectedServices, startDate, endDate, bookings]);

  // Chart data
  const chartData = useMemo(
    () => ({
      labels: filteredBookings.map((b) => new Date(b.date).toLocaleDateString()),
      datasets: [
        {
          label: "Bookings Over Time",
          data: filteredBookings.map(() => 1),
          backgroundColor: "#63b7ad",
          borderColor: "#2A9D68",
          borderWidth: 2,
          tension: 0.3,
        },
      ],
    }),
    [filteredBookings]
  );

  const serviceChartData = useMemo(
    () => ({
      labels: services,
      datasets: [
        {
          label: "Service Popularity",
          data: services.map(
            (service) => filteredBookings.filter((b) => b.service === service).length
          ),
          backgroundColor: "#6ec7a4",
        },
      ],
    }),
    [filteredBookings, services]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-800">
        <div className="text-2xl font-semibold dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-background-light dark:bg-gray-800 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-text-dark dark:text-text-light font-heading">
            Admin Dashboard
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`relative w-16 h-8 rounded-full flex items-center justify-center
              ${darkMode ? "bg-black" : "bg-white"} shadow-md transition-colors duration-300`}
          >
            <span
              className={`absolute w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500
              ${darkMode ? "left-1 bg-gray-800 text-white" : "right-1 bg-white text-black"}`}
            >
              {darkMode ? "🌙" : "☀️"}
            </span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 sticky top-20 bg-background-light dark:bg-gray-800 z-10 p-4 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search by Name, Email, Phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 flex-1 min-w-[200px]"
          />

          {/* Service dropdown */}
          <div className="relative flex-1 min-w-[200px]">
            <button
              onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-left flex justify-between items-center"
            >
              {selectedServices.length === 0 ? "Select Services" : selectedServices.join(", ")}
              <span className="ml-2">{serviceDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {serviceDropdownOpen && (
              <div className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-700 border rounded-lg max-h-48 overflow-auto shadow-lg">
                {services.map((service, idx) => (
                  <label
                    key={idx}
                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedServices.includes(service)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedServices([...selectedServices, service]);
                        } else {
                          setSelectedServices(selectedServices.filter((s) => s !== service));
                        }
                      }}
                    />
                    {service}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Date filters */}
          <div className="flex items-center gap-2">
            <label htmlFor="startDate" className="dark:text-white">
              From:
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="endDate" className="dark:text-white">
              To:
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4 font-heading">Bookings Over Time</h2>
            <Line data={chartData} />
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4 font-heading">Service Popularity</h2>
            <Bar data={serviceChartData} />
          </div>
        </div>

        {/* CSV Export */}
        <div className="mb-4">
          <CSVLink
            data={filteredBookings}
            filename={"bookings.csv"}
            className="px-4 py-2 bg-button-light hover:bg-secondary-light text-white rounded-lg font-body"
          >
            Export to CSV
          </CSVLink>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-700 rounded-xl shadow-lg">
          <table className="min-w-full border-collapse">
            <thead className="bg-primary-light dark:bg-primary-dark text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Service</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500 dark:text-gray-300">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const isPending = b.status.toLowerCase() === "pending";
                  return (
                    <tr
                      key={b._id}
                      className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      <td className="py-3 px-4">{b.name}</td>
                      <td className="py-3 px-4">{b.email}</td>
                      <td className="py-3 px-4">{b.phone}</td>
                      <td className="py-3 px-4">{b.service}</td>
                      <td className="py-3 px-4">{new Date(b.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4">{b.time}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs ${
                            isPending
                              ? "bg-yellow-500"
                              : b.status.toLowerCase() === "confirmed"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        {isPending && (
                          <button
                            onClick={() => handleConfirm(b._id)}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-transform transform hover:scale-105"
                          >
                            Confirm
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setRescheduleBooking(b);
                            setNewDate(b.date.split('T')[0]);
                            setNewTime(b.time);
                          }}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-transform transform hover:scale-105"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-transform transform hover:scale-105"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Reschedule Modal */}
        {rescheduleBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Reschedule Appointment for {rescheduleBooking.name}
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm mb-2 dark:text-white">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm mb-2 dark:text-white">New Time</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500"
                />
              </div>
              
              {rescheduleError && (
                <div className="mb-4 text-red-500 text-sm">{rescheduleError}</div>
              )}
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setRescheduleBooking(null);
                    setRescheduleError("");
                  }}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
                  disabled={isRescheduling}
                >
                  Cancel
                </button>
                <button
                  onClick={handleReschedule}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center"
                  disabled={isRescheduling}
                >
                  {isRescheduling ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}