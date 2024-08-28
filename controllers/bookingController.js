// import Bookings from "../models/Bookings";
const Bookings = require("../models/Bookings.js")

exports.createBooking = async (req, res) => {
    try {
      const booking = new Bookings(req.body);
      await booking.save();
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };