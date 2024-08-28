const express = require("express");
const {createService, getAllServices, getServiceById} = require("../controllers/serviceController")

const router = express.Router()

router.post("/create-service", createService);
router.get("/all-services", getAllServices);
router.get("/:id", getServiceById)

module.exports = router;