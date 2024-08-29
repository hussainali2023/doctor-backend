// import Bookings from "../models/Bookings";
const Bookings = require("../models/Bookings.js");
const NewUser = require("../models/NewUser.js");

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
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    let query = {};
    if (req.query?.email) {
      query = { email: req.query.email };
    }
    const bookings = await Bookings.find(query);
    const user = await NewUser.findById(req.user._id).select('-password');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      else{

        res.json(bookings);
      }
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

exports.deleteBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Attempt to delete the booking by ID
    const deletedBooking = await Bookings.findByIdAndDelete(bookingId);

    // Check if a booking was deleted
    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    // Respond with a success message if deletion is successful
    res.status(200).json({ message: "Booking deleted successfully" });
    
  } catch (error) {
    console.log("from deleteBooking:", error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
