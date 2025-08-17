const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();
const nodemailer = require("nodemailer");

// Helper function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Helper function to format time
const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const time = new Date();
  time.setHours(hours);
  time.setMinutes(minutes);
  return time.toLocaleTimeString("en-IN", {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// HTML email template generator
const generateEmailTemplate = (booking, type) => {
  const formattedDate = formatDate(booking.date);
  const formattedTime = formatTime(booking.time);
  
  if (type === "confirmed") {
    return `
    <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
      <div style="background: #4CAF50; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">Appointment Confirmed</h1>
      </div>
      
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Hi <strong>${booking.name}</strong>,</p>
        
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p style="margin: 5px 0;"><strong>Service:</strong> ${booking.service}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
          <p style="margin: 5px 0;"><strong>Time:</strong> ${formattedTime}</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> Confirmed ✅</p>
        </div>
        
        <p style="font-size: 15px; line-height: 1.5;">
          We look forward to seeing you for your appointment. Please arrive 10 minutes early.
        </p>
      </div>
      
      <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 14px; color: #666;">
        <p>© ${new Date().getFullYear()} RehabFlow Clinic</p>
      </div>
    </div>
    `;
  } else {
    return `
    <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
      <div style="background: #f44336; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">Appointment Cancelled</h1>
      </div>
      
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Hi <strong>${booking.name}</strong>,</p>
        
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p style="margin: 5px 0;"><strong>Service:</strong> ${booking.service}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
          <p style="margin: 5px 0;"><strong>Time:</strong> ${formattedTime}</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> Cancelled ❌</p>
        </div>
        
        <p style="font-size: 15px; line-height: 1.5;">
          We apologize for any inconvenience. Please contact us to reschedule.
        </p>
      </div>
      
      <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 14px; color: #666;">
        <p>© ${new Date().getFullYear()} RehabFlow Clinic</p>
      </div>
    </div>
    `;
  }
};

// CREATE booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ single booking
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE booking
router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE booking
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send email notification
router.post("/:id/send-email", async (req, res) => {
  try {
    const { type } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `"RehabFlow Clinic" <${process.env.EMAIL}>`,
      to: booking.email,
      subject: type === "confirmed" 
        ? `Appointment Confirmed - ${formatDate(booking.date)}` 
        : `Appointment Cancelled - ${formatDate(booking.date)}`,
      text: type === "confirmed"
        ? `Hi ${booking.name},\n\nYour ${booking.service} appointment is confirmed for ${formatDate(booking.date)} at ${formatTime(booking.time)}.\n\nThank you,\nRehabFlow Team`
        : `Hi ${booking.name},\n\nYour ${booking.service} appointment on ${formatDate(booking.date)} has been cancelled.\n\nWe apologize for any inconvenience.\n\nRehabFlow Team`,
      html: generateEmailTemplate(booking, type)
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
    
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ 
      message: "Error sending email",
      error: err.message 
    });
  }
});

module.exports = router;