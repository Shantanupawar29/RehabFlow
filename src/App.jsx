import Navbar from "./components/Navbar";
import HeroSection from "./Pages/Hero";
import Home from "./Pages/Home_page";
import ServicesPage from "./Pages/Services";
import BookingPage from "./Pages/Booking";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/book" element={<BookingPage />} />
      
      </Routes>
      <Navbar/>
      <HeroSection/>  
      <ServicesPage/>
      <BookingPage/>
      <Footer/>
      
    </div>
  )
}