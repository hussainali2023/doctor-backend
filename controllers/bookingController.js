// import Bookings from "../models/Bookings";
const Bookings = require("../models/Bookings.js");

exports.createBooking = async (req, res) => {
    try {
      const booking = new Bookings(req.body);
      await booking.save();
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.getAllBookings = async (req, res) => {
    try {
      let query = {};
      if(req.query?.email){
        query = {email: req.query.email}
      }
      const bookings = await Bookings.find(query);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getBookingById = async (req, res) => {
    try {
      const booking = await Bookings.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };