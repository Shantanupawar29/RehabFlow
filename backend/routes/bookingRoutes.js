const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

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
    const bookings = await Booking.find();
    res.json(bookings);
});

// READ single booking
router.get("/:id", async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    res.json(booking);
});

// UPDATE booking
router.put("/:id", async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(booking);
});

// DELETE booking
router.delete("/:id", async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
});

module.exports = router;
