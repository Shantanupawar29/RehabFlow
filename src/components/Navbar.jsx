import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Toggle dark mode
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
      setDarkMode(true);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary-light dark:bg-primary-dark shadow-md backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Nav */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-text-dark dark:text-text-light">
            RehabFlow
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/book">Book Slot</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <FaUserCircle className="text-xl text-text-dark dark:text-text-light" />
                <span className="text-text-dark dark:text-text-light">Profile</span>
              </button>
              
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    View Profile
                  </Link>
                  <Link 
                    to="/appointments" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    My Appointments
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <Link 
                    to="/logout" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle - Centered with correct colors */}
            <button
              onClick={toggleDarkMode}
              className={`relative w-16 h-8 rounded-full flex items-center justify-center
                ${darkMode ? "bg-black" : "bg-white"}
                shadow-md transition-colors duration-300`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className={`absolute w-7 h-7 rounded-full flex items-center justify-center
                transition-all duration-500
                ${darkMode ? 
                  "left-1 bg-gray-800 text-white" : 
                  "right-1 bg-white text-black"}`}
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.354a1 1 0 011 0l2.618 1.513a1 1 0 01.5.866v3.022a1 1 0 01-1 1H12a1 1 0 01-1-1V6.733a1 1 0 01.5-.866L12 4.354zM7 7a5 5 0 1110 0A5 5 0 017 7z" />
                  </svg>
                )}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`relative w-12 h-6 rounded-full flex items-center justify-center
                ${darkMode ? "bg-black" : "bg-white"}
                shadow-inner`}
            >
              <span className={`absolute w-5 h-5 rounded-full flex items-center justify-center
                transition-all duration-500
                ${darkMode ? 
                  "left-1 bg-gray-700 text-white" : 
                  "right-1 bg-gray-100 text-black"}`}
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.354a1 1 0 011 0l2.618 1.513a1 1 0 01.5.866v3.022a1 1 0 01-1 1H12a1 1 0 01-1-1V6.733a1 1 0 01.5-.866L12 4.354zM7 7a5 5 0 1110 0A5 5 0 017 7z" />
                  </svg>
                )}
              </span>
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-dark dark:text-text-light focus:outline-none"
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3 mt-4">
              <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/services" onClick={() => setMobileMenuOpen(false)}>Services</MobileNavLink>
              <MobileNavLink to="/book" onClick={() => setMobileMenuOpen(false)}>Book Slot</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setMobileMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</MobileNavLink>
              
              {/* Mobile Profile Links */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <MobileNavLink to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</MobileNavLink>
                <MobileNavLink to="/appointments" onClick={() => setMobileMenuOpen(false)}>Appointments</MobileNavLink>
                <MobileNavLink to="/settings" onClick={() => setMobileMenuOpen(false)}>Settings</MobileNavLink>
                <MobileNavLink to="/logout" onClick={() => setMobileMenuOpen(false)}>Logout</MobileNavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Reusable NavLink component
const NavLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="text-text-dark dark:text-text-light hover:text-primary-dark dark:hover:text-primary-light transition-colors"
  >
    {children}
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({ to, children, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-text-dark dark:text-text-light hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
  >
    {children}
  </Link>
);