const User = require("../models/User.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// Register User
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
            expiresIn: '1h'
        });

        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

