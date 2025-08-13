import React, { useState, useEffect } from 'react';
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
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const date = new Date().toLocaleDateString(i18n.language, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    setTodayDate(date);
  }, [i18n.language]);

  return (
    <footer className="bg-primary-dark dark:bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Clinic Info */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 font-heading">RehabFlow</h3>
            <p className="mb-4 font-body">
              {t("footerDesc")}
            </p>
            <div className="flex items-center mb-3">
              <FaMapMarkerAlt className="mr-3 text-primary-light" />
              <span className="font-body">{t("address")}</span>
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
              <span className="font-body">{t("timing")}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 font-heading">{t("quickLinks")}</h3>
            <ul className="space-y-2 font-body">
              <li><Link to="/" className="hover:text-primary-light">{t("home")}</Link></li>
              <li><Link to="/services" className="hover:text-primary-light">{t("ourServices")}</Link></li>
              <li><Link to="/about" className="hover:text-primary-light">{t("aboutUs")}</Link></li>
              <li><Link to="/team" className="hover:text-primary-light">{t("ourTeam")}</Link></li>
              <li><Link to="/blog" className="hover:text-primary-light">{t("blog")}</Link></li>
              <li><Link to="/contact" className="hover:text-primary-light">{t("contact")}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 font-heading">{t("ourServices")}</h3>
            <ul className="space-y-2 font-body">
              <li><Link to="/services/therapeutic-ultrasound" className="hover:text-primary-light">{t("therapeuticUltrasound")}</Link></li>
              <li><Link to="/services/cupping-therapy" className="hover:text-primary-light">{t("cuppingTherapy")}</Link></li>
              <li><Link to="/services/myofascial-release" className="hover:text-primary-light">{t("myofascialRelease")}</Link></li>
              <li><Link to="/services/hand-therapy" className="hover:text-primary-light">{t("handTherapy")}</Link></li>
              <li><Link to="/services/trigger-point" className="hover:text-primary-light">{t("triggerPointRelease")}</Link></li>
              <li><Link to="/services/ift" className="hover:text-primary-light">{t("interferentialTherapy")}</Link></li>
            </ul>
          </div>

          {/* Newsletter + Language Selector */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 font-heading">{t("newsletter")}</h3>
            <p className="mb-4 font-body">
              {t("newsletterDesc")}
            </p>
            <form className="flex flex-col">
              <input 
                type="email" 
                placeholder={t("yourEmail")}
                className="px-4 py-2 mb-3 rounded-lg text-gray-800 font-body"
                required
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-button-light hover:bg-secondary-light rounded-lg font-medium font-body"
              >
                {t("subscribe")}
              </button>
            </form>

            {/* Language Selector + Date */}
            <div className="mt-6 flex flex-col gap-2">
              <select
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-gray-800 dark:text-gray-200"
                value={i18n.language}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>
              <span className="text-sm text-gray-300">{t("today")}: {todayDate}</span>
            </div>

            {/* Social Links */}
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-white hover:text-primary-light text-xl"><FaFacebookF /></a>
              <a href="#" className="text-white hover:text-primary-light text-xl"><FaInstagram /></a>
              <a href="#" className="text-white hover:text-primary-light text-xl"><FaTwitter /></a>
              <a href="#" className="text-white hover:text-primary-light text-xl"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-body mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} RehabFlow. {t("allRightsReserved")}
          </p>
          <div className="flex space-x-4 font-body">
            <Link to="/privacy" className="hover:text-primary-light">{t("privacyPolicy")}</Link>
            <Link to="/terms" className="hover:text-primary-light">{t("termsOfService")}</Link>
            <Link to="/sitemap" className="hover:text-primary-light">{t("sitemap")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
