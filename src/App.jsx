import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home_page";
import HeroSection from "./Pages/Hero";
import ServicesPage from "./Pages/Services";
import BookingPage from "./Pages/Booking";
import Footer from "./components/Footer";
import { SearchProvider } from "./context/SearchContext";
import AISearchBox from "./components/AISearchBox";
import AdminDashboard from "./Pages/AdminDashboard";

function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <AISearchBox />
      <Footer />
    </div>
  );
}

function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {children} {/* Admin dashboard will manage its own UI */}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <SearchProvider>
        <Routes>
          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />

          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                {/* <Home /> */}
                <HeroSection />
                <ServicesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/services"
            element={
              <PublicLayout>
                <ServicesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/book"
            element={
              <PublicLayout>
                <BookingPage />
              </PublicLayout>
            }
          />
        </Routes>
      </SearchProvider>
    </Router>
  );
}
