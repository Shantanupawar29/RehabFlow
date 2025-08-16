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

export default function App() {
  return (
    <Router>
      <SearchProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <HeroSection/>  
      <ServicesPage/>
      {/* <BookingPage/> */}
          <main className="flex-grow">
            <Routes>
              {/* //<Route path="/services/:serviceId" element={<ServicePage />} /> */}

              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/book" element={<BookingPage />} />
            </Routes>
          </main>
          <AISearchBox />
          <Footer />
        </div>
      </SearchProvider>
    </Router>
  );
}