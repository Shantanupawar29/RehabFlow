import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const date = new Date().toLocaleDateString(i18n.language, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    setTodayDate(date);
  }, [i18n.language]);

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
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-text-dark dark:text-text-light">
            RehabFlow
          </Link>

          {/* Language Selector + Date */}
          <div className="hidden md:flex items-center gap-4">
            <select
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-gray-800 dark:text-gray-200"
              value={i18n.language}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
            </select>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t("today")}: {todayDate}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/">{t("home")}</NavLink>
            <NavLink to="/services">{t("services")}</NavLink>
            <NavLink to="/book">{t("bookSlot")}</NavLink>
            <NavLink to="/about">{t("about")}</NavLink>
            <NavLink to="/contact">{t("contact")}</NavLink>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <FaUserCircle className="text-xl text-text-dark dark:text-text-light" />
                <span className="text-text-dark dark:text-text-light">{t("profile")}</span>
              </button>
              
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                    {t("viewProfile")}
                  </Link>
                  <Link to="/appointments" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                    {t("myAppointments")}
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                    {t("settings")}
                  </Link>
                  <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                    {t("logout")}
                  </Link>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle - your original code */}
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
            {/* Mobile Language Selector */}
            <select
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5 text-xs text-gray-800 dark:text-gray-200"
              value={i18n.language}
            >
              <option value="en">EN</option>
              <option value="hi">हि</option>
              <option value="mr">म</option>
            </select>

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
      </div>
    </nav>
  );
}

const NavLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="text-text-dark dark:text-text-light hover:text-primary-dark dark:hover:text-primary-light transition-colors"
  >
    {children}
  </Link>
);
