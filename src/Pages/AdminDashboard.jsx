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
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const services = useMemo(() => [
    "Therapeutic Ultrasound",
    "Cupping Therapy",
    "Myofascial Release",
    "Hand Therapy",
    "Interferential Therapy (IFT)",
    "Trigger Point Release",
  ], []);

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

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  // Filter & Search
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

    if (startDate) {
      data = data.filter((b) => new Date(b.date) >= new Date(startDate));
    }
    if (endDate) {
      data = data.filter((b) => new Date(b.date) <= new Date(endDate));
    }

    return data;
  }, [search, selectedServices, startDate, endDate, bookings]);

  // Chart data
  const chartData = useMemo(() => ({
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
  }), [filteredBookings]);

  const serviceChartData = useMemo(() => ({
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
  }), [filteredBookings, services]);

  // Delete booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete appointment.");
    }
  };

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-text-dark dark:text-text-light font-heading">
            Admin Dashboard
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`relative w-16 h-8 rounded-full flex items-center justify-center
              ${darkMode ? "bg-black" : "bg-white"} shadow-md transition-colors duration-300`}
            aria-label={`Toggle ${darkMode ? "light" : "dark"} mode`}
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
            aria-label="Search bookings"
          />

          {/* Multi-select dropdown */}
          <div className="relative flex-1 min-w-[200px]">
            <button
              onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-left flex justify-between items-center"
              aria-label="Select services"
              aria-expanded={serviceDropdownOpen}
            >
              {selectedServices.length === 0
                ? "Select Services"
                : selectedServices.join(", ")}
              <span className="ml-2">{serviceDropdownOpen ? "▲" : "▼"}</span>
            </button>

            {serviceDropdownOpen && (
              <div
                className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-700 border rounded-lg max-h-48 overflow-auto shadow-lg"
              >
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

          <div className="flex items-center gap-2">
            <label htmlFor="startDate" className="dark:text-white">From:</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="endDate" className="dark:text-white">To:</label>
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
            aria-label="Export to CSV"
          >
            Export to CSV
          </CSVLink>
        </div>

        {/* Booking Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-700 rounded-xl shadow-lg">
          <table className="min-w-full border-collapse">
            <thead className="bg-primary-light dark:bg-primary-dark text-white">
              <tr>
                <th className="py-3 px-4 font-body text-left">Name</th>
                <th className="py-3 px-4 font-body text-left">Email</th>
                <th className="py-3 px-4 font-body text-left">Phone</th>
                <th className="py-3 px-4 font-body text-left">Service</th>
                <th className="py-3 px-4 font-body text-left">Date</th>
                <th className="py-3 px-4 font-body text-left">Time</th>
                <th className="py-3 px-4 font-body text-left">Status</th>
                <th className="py-3 px-4 font-body text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500 dark:text-gray-300">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-12 h-12 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      No appointments found matching your criteria.
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
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
                      <span className={`px-2 py-1 rounded-full text-white text-xs ${
                        b.status === "Pending" ? "bg-yellow-500" :
                        b.status === "Confirmed" ? "bg-green-500" :
                        "bg-red-500"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-transform transform hover:scale-105"
                        aria-label={`Delete booking for ${b.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}