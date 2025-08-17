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

  const sendBookingEmail = async (bookingId, type) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/bookings/${bookingId}/send-email`,
      { type }
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Error sending email:", err.response?.data || err.message);
    throw err;
  }
};


const handleDelete = async (id) => {
  const booking = bookings.find(b => b._id === id);
  if (!booking) return alert("Booking not found");

  if (!window.confirm("Are you sure you want to delete this appointment?")) return;

  try {
    // Send deletion email using the existing booking data
    await sendBookingEmail(id, "deleted"); 

    // Then delete booking
    await axios.delete(`http://localhost:5000/api/bookings/${id}`);

    await fetchBookings();
    alert("Appointment deleted and email sent!");
  } catch (err) {
    console.error(err);
    alert(`Failed to delete appointment: ${err.response?.data?.message || err.message}`);
  }
};


  const handleConfirm = async (id) => {
    try {
      // Update status to confirmed
      console.log('1. Starting confirmation for booking:', id);
       console.log('2. Sending status update request...');
      const updateResponse = await axios.put(
      `http://localhost:5000/api/bookings/${id}`,
      { status: "Confirmed" }
    );
     console.log('3. Update response:', updateResponse.data);
     console.log('4. Attempting to send confirmation email...');
      // Send confirmation email
       const emailResponse = await sendBookingEmail(id, "confirmed");
      console.log('6. Refreshing bookings...');
    await fetchBookings();
    
    console.log('7. Process completed successfully');
    alert('Appointment confirmed and email sent!');
      
      // Refresh data
    
    } catch (err) {
      console.error('Confirmation error:', {
      step: err.step || 'unknown',
      message: err.message,
      response: err.response?.data
    });
    alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

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
                <th className="py-3 px-4 text-left">Current Status</th>
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
      </div>
    </div>
  );
}
