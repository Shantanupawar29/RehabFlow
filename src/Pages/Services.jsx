import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BookingPage from './Booking';
// Import service images from assets
import service1 from '../assets/service1.jpg';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.jpg';
import service4 from '../assets/service4.jpg';
import service5 from '../assets/service5.jpg';
import service6 from '../assets/service6.jpg';

const ServicesPage = () => {
  const [expandedService, setExpandedService] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const services = [
    {
      id: 1,
      title: "Therapeutic Ultrasound",
      image: service1,
      shortDesc: "Non-invasive treatment using sound waves to promote healing.",
      fullDesc: "Therapeutic ultrasound uses high-frequency sound waves to treat deep tissue injuries by increasing blood flow and reducing inflammation. Effective for muscle strains, tendonitis, and joint stiffness."
    },
    {
      id: 2,
      title: "Cupping Therapy",
      image: service2,
      shortDesc: "Ancient technique to relieve muscle tension and improve circulation.",
      fullDesc: "Cupping therapy creates suction on the skin to increase blood flow, relieve muscle tension, and promote cell repair. Helps with pain relief, inflammation reduction, and relaxation."
    },
    {
      id: 3,
      title: "Myofascial Release",
      image: service3,
      shortDesc: "Gentle pressure to release tension in the connective tissue.",
      fullDesc: "Myofascial release targets the connective tissue surrounding muscles to relieve pain and restore motion. Particularly effective for chronic pain and restricted mobility."
    },
    {
      id: 4,
      title: "Hand Therapy",
      image: service4,
      shortDesc: "Specialized rehabilitation for hand and wrist conditions.",
      fullDesc: "Customized treatment for hand injuries, arthritis, and post-surgical rehabilitation. Includes exercises, splinting, and manual therapy to restore function and dexterity."
    },
    {
      id: 5,
      title: "Interferential Therapy (IFT)",
      image: service5,
      shortDesc: "Electrical stimulation for pain relief and muscle rehabilitation.",
      fullDesc: "IFT uses medium-frequency electrical currents to stimulate nerves and muscles, providing pain relief and promoting healing. Effective for chronic pain, edema reduction, and muscle stimulation."
    },
    {
      id: 6,
      title: "Trigger Point Release",
      image: service6,
      shortDesc: "Targeted treatment for muscle knots and tension.",
      fullDesc: "This technique applies focused pressure to hyperirritable spots in skeletal muscle to relieve pain and improve range of motion. Beneficial for tension headaches, back pain, and repetitive strain injuries."
    }
  ];

  const toggleService = (id) => {
    setExpandedService(expandedService === id ? null : id);
  };

  const handleBookClick = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-gray-800">
      {/* Services Header */}
      <div className="bg-primary-light dark:bg-primary-dark text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4 font-heading">Our Services</h1>
          <p className="text-xl max-w-2xl mx-auto font-body">
            Comprehensive physiotherapy treatments tailored to your needs
          </p>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-text-dark dark:text-text-light font-heading">
                    {service.title}
                  </h3>
                  
                  {expandedService === service.id ? (
                    <>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 font-body">
                        {service.fullDesc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleBookClick(service.title)}
                          className="px-4 py-2 bg-button-light hover:bg-secondary-light text-white rounded-lg transition-colors font-body"
                        >
                          Book Now
                        </button>
                        <button
                          onClick={() => toggleService(service.id)}
                          className="px-4 py-2 text-primary-light dark:text-primary-dark hover:underline font-body"
                        >
                          Show Less
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 font-body">
                        {service.shortDesc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => toggleService(service.id)}
                          className="px-4 py-2 text-primary-light dark:text-primary-dark hover:underline font-body"
                        >
                          Learn More
                        </button>
                        <Link 
                          to="/book" 
                          state={{ service: service.title }}
                          className="px-4 py-2 bg-button-light hover:bg-secondary-light text-white rounded-lg transition-colors font-body"
                        >
                          Quick Book
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md w-full"
          >
            <h3 className="text-2xl font-bold mb-4 font-heading">Book Appointment</h3>
            <form>
              <div className="mb-4">
                <label className="block mb-2 font-medium font-body">Service</label>
                <select 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 font-body"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium font-body">Date</label>
                <input 
                  type="date" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 font-body" 
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium font-body">Time</label>
                <input 
                  type="time" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 font-body" 
                  min="09:00" 
                  max="18:00"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-body"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-button-light hover:bg-secondary-light text-white rounded transition-colors font-body"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;