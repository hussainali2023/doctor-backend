const NewUser = require("../models/NewUser.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registration Controller
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await NewUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await NewUser.create({ name, email, password });

    const createdUser = await NewUser.findById(newUser._id).select(
      "-password -refreshToken"
    );

    res.status(201).json({
      message: "New User Created",
      user: createdUser,
    });
  } catch (error) {
    console.log(error); // This will log the error in your server console
    res.status(500).json({ message: "Server error", error });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await NewUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate access and refresh tokens
    const accessToken = user.generateAcessToken();
    const refreshToken = user.generateRefreshToken();

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: false, // Prevents JavaScript access to the cookie
      // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      // sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Currently Logged-in User Controller
// Get Currently Logged-in User Controller
exports.getCurrentUser = async (req, res) => {
  try {
    // Ensure req.user is set by the protect middleware
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await NewUser.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Logout Controller
exports.logout = async (req, res) => {
  try {
    // Clear the cookies by setting their expiration to the past
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    // Ensure req.user is available
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Optionally fetch the user (if needed for logging or other purposes)
    const user = await NewUser.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.error("Logout error:", error); // Log the error for debugging
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

