const NewUser = require("../models/NewUser");
const jwt = require("jsonwebtoken")


exports.protect = async (req, res, next) => {
    let token;
  
    // Check for token in cookies
    token = req.cookies.accessToken;

    // console.log("Token", token)
    // console.log("Cookies", req.cookies)
  
    // If no token is found
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // console.log("Decoded Token:", decoded); // Log the decoded token for debugging
  
      // Attach user information to request
      req.user = await NewUser.findById(decoded._id).select('-password');
  
      // Check if user exists
      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Proceed to the next middleware/controller
      next();
    } catch (error) {
      console.error("Token verification error:", error); // Log the error for debugging
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  };