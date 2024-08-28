const express = require("express");
const {createBooking, getAllBookings, getBookingById} = require("../controllers/bookingController") 


const router = express.Router()

router.post("/create-booking", createBooking);
router.get("/all-bookings", getAllBookings);
router.get("/:id", getBookingById)

module.exports = router;