import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import clinicImg from '../assets/clinic.jpg';
import therapyImg from '../assets/therapy.jpg';
import equipmentImg from '../assets/equipment.jpg';
import teamImg from '../assets/team.jpg';
import doctorImg from '../assets/doctor.jpeg';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { id: 1, src: clinicImg, alt: 'RehabFlow clinic reception' },
    { id: 2, src: therapyImg, alt: 'Physiotherapy session' },
    { id: 3, src: equipmentImg, alt: 'Modern therapy equipment' },
    { id: 4, src: teamImg, alt: 'Our professional team' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative">
      {/* Text Content with Gradient Background */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 pt-8">
              Welcome to <span className="text-primary-light dark:text-primary-dark">RehabFlow</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Your Partner in Pain-Free Living
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg dark:prose-invert mx-auto"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              At RehabFlow, our mission is to provide exceptional, patient-centered physiotherapy that empowers you to live a life free from pain and limitations.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              We understand that every individual's journey to recovery is unique, which is why we offer personalized treatment plans tailored to your specific needs and goals. Our clinic is equipped with modern facilities and our team utilizes evidence-based techniques to address a wide range of conditions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Image Slider with Overlay Text */}
      <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 10 : 0
            }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-2xl mx-auto"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{slide.alt}</h2>
                <p className="text-blue-200">
                  We believe in a holistic approach, focusing not just on physical recovery but also on education and prevention.
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
        
        {/* Navigation dots */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Doctor Profile Section */}
      <div className="bg-white dark:bg-gray-900 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            {/* Doctor's Image */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img
                  src={doctorImg}
                  alt="Dr. Neeta Pawar"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Doctor's Bio */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                About Dr. Neeta Pawar
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Dr. Neeta Pawar is a highly respected and experienced physiotherapist with a passion for helping her patients achieve their full potential. She holds a Bachelor of Occupational Therapy (BOT) and has extensive experience from her work at the renowned K.E.M. Hospital in Mumbai.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Dr. Pawar is dedicated to her profession and has a special interest in treating conditions such as functional neurological disorders, physical mobility impairments, and musculoskeletal pain. Her expertise, combined with her compassionate approach, has earned her a reputation as a trusted and effective healthcare provider.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  With over two decades of clinical experience, Dr. Pawar is committed to providing the highest quality of care and building a supportive partnership with each of her patients.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;