const express = require('express');
const { register, login, getCurrentUser, logout } = require("../controllers/newUserController");
const { protect } = require('../middleware/authNewMiddleware');

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route to get the currently logged-in user's information
router.get('/me', protect, getCurrentUser);

router.post("/logout", protect, logout)

module.exports = router;
