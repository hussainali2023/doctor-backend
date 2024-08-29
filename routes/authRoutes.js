const express = require("express")
const {registerUser, loginUser, logoutUser, checkAuth} = require("../controllers/authController");
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/logout", logoutUser)
router.get("/checkAuth", checkAuth)

module.exports = router;
