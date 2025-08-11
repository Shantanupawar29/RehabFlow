import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const BookingPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    service: location.state?.service || '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Booking submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        service: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 1500);
  };

  const services = [
    "Therapeutic Ultrasound",
    "Cupping Therapy",
    "Myofascial Release",
    "Hand Therapy",
    "Interferential Therapy (IFT)",
    "Trigger Point Release"
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-gray-800">
      {/* Booking Header */}
      <div className="bg-primary-light dark:bg-primary-dark text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4 font-heading">Book Your Appointment</h1>
          <p className="text-xl max-w-2xl mx-auto font-body">
            Schedule your session with our expert physiotherapists
          </p>
        </div>
      </div>

      {/* Booking Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8"
          >
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white font-heading">
                  Appointment Booked Successfully!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 font-body">
                  We've sent a confirmation to your email. Our team will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2 bg-button-light hover:bg-secondary-light text-white rounded-lg transition-colors font-body"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 text-text-dark dark:text-text-light font-heading">
                  Appointment Details
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Service Selection */}
                    <div className="mb-4">
                      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 font-body">
                        Service Required
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-body"
                        required
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    {/* Date */}
                    <div className="mb-4">
                      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 font-body">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-body"
                        required
                      />
                    </div>

                    {/* Time */}
                    <div className="mb-4">
                      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 font-body">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        min="09:00"
                        max="18:00"
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-body"
                        required
                      />
                    </div>

                    {/* Name */}
                    <div className="mb-4">
                      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 font-body">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-body"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 font-body">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-body"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 font-body">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-body"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 font-body">
                      Additional Information
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-body"
                      placeholder="Any specific concerns or notes for the therapist"
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-button-light hover:bg-secondary-light text-white rounded-lg font-medium transition-colors font-body flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Confirm Appointment'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;