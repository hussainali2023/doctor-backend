const express = require("express");
const {createBooking} = require("../controllers/bookingController") 


const router = express.Router()

router.post("/create-booking", createBooking);
// router.get("/all-services", getAllServices);
// router.get("/:id", getServiceById)

module.exports = router;