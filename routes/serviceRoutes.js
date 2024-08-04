const express = require("express");
const {createService, getAllServices} = require("../controllers/serviceController")

const router = express.Router()

router.post("/create-service", createService);
router.get("/all-services", getAllServices);

module.exports = router;