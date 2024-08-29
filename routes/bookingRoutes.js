const express = require("express");
const {createBooking, getAllBookings, getBookingById, deleteBookingById} = require("../controllers/bookingController"); 
const { protect } = require("../middleware/authNewMiddleware");


const router = express.Router()

router.post("/create-booking", createBooking);
router.get("/all-bookings",protect, getAllBookings);
router.get("/:id", getBookingById)
router.delete("/delete/:id", deleteBookingById)

module.exports = router;