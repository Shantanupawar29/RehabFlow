// backend/routes/bookings.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const nodemailer = require("nodemailer");

// Send email after deletion or confirmation
router.post("/:id/send-email", async (req, res) => {
  const { type } = req.body;
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).send("Booking not found");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    let subject = "";
    let text = "";

    if (type === "deleted") {
      subject = "Your appointment has been deleted";
      text = `Hi ${booking.name},\n\nYour appointment for ${booking.service} on ${booking.date} has been deleted.`;
    } else if (type === "confirmed") {
      subject = "Your appointment is confirmed";
      text = `Hi ${booking.name},\n\nYour appointment for ${booking.service} on ${booking.date} is confirmed.`;
    }

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: booking.email,
      subject,
      text,
    });

    res.status(200).send("Email sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending email");
  }
});

module.exports = router;
