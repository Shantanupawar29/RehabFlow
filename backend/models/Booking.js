const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: String,
  message: String,
  status: { type: String, default: "pending" }
}, { timestamps: true });


module.exports = mongoose.model("Booking", bookingSchema);
