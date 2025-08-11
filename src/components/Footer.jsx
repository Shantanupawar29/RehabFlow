import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedinIn 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary-dark dark:bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Clinic Info */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 font-heading">RehabFlow</h3>
            <p className="mb-4 font-body">
              Your trusted partner in pain-free living through exceptional physiotherapy care.
            </p>
            <div className="flex items-center mb-3">
              <FaMapMarkerAlt className="mr-3 text-primary-light" />
              <span className="font-body">123 Therapy Lane, Health City, HC 12345</span>
            </div>
            <div className="flex items-center mb-3">
              <FaPhone className="mr-3 text-primary-light" />
              <span className="font-body">(123) 456-7890</span>
            </div>
            <div className="flex items-center mb-3">
              <FaEnvelope className="mr-3 text-primary-light" />
              <span className="font-body">info@rehabflow.com</span>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-3 text-primary-light" />
              <span className="font-body">Mon-Fri: 8am-7pm | Sat: 9am-3pm</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link to="/" className="hover:text-primary-light transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary-light transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-light transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-primary-light transition-colors">Our Team</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary-light transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-light transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 font-heading">Our Services</h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link to="/services/therapeutic-ultrasound" className="hover:text-primary-light transition-colors">Therapeutic Ultrasound</Link>
              </li>
              <li>
                <Link to="/services/cupping-therapy" className="hover:text-primary-light transition-colors">Cupping Therapy</Link>
              </li>
              <li>
                <Link to="/services/myofascial-release" className="hover:text-primary-light transition-colors">Myofascial Release</Link>
              </li>
              <li>
                <Link to="/services/hand-therapy" className="hover:text-primary-light transition-colors">Hand Therapy</Link>
              </li>
              <li>
                <Link to="/services/trigger-point" className="hover:text-primary-light transition-colors">Trigger Point Release</Link>
              </li>
              <li>
                <Link to="/services/ift" className="hover:text-primary-light transition-colors">Interferential Therapy</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 font-heading">Newsletter</h3>
            <p className="mb-4 font-body">
              Subscribe to our newsletter for health tips and special offers.
            </p>
            <form className="flex flex-col">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 mb-3 rounded-lg text-gray-800 font-body"
                required
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-button-light hover:bg-secondary-light rounded-lg font-medium font-body"
              >
                Subscribe
              </button>
            </form>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-white hover:text-primary-light text-xl">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white hover:text-primary-light text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-primary-light text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-white hover:text-primary-light text-xl">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-body mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} RehabFlow. All rights reserved.
          </p>
          <div className="flex space-x-4 font-body">
            <Link to="/privacy" className="hover:text-primary-light">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-light">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-primary-light">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;