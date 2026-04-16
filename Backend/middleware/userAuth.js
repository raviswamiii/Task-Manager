import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import blackListTokenModel from "../models/blackListToken.js";

// Middleware to authenticate user
const userAuth = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token =
      req.cookies?.token ||
      (req.headers.authorization &&
        req.headers.authorization.split(" ")[1]);

    // If token not found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    // Check if token is blacklisted (logged out)
    const blackListed = await blackListTokenModel.findOne({ token });

    if (blackListed) {
      return res.status(403).json({
        success: false,
        message: "Token is invalid (logged out)",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user from decoded token
    const user = await userModel.findById(decoded.id).select("-password");

    // If user not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Attach user info to request
    req.user = user;
    req.userId = user._id;

    // Proceed to next middleware/controller
    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    // Invalid token
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Expired token
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired, please login again",
      });
    }

    // Generic error
    return res.status(500).json({
      success: false,
      message: "Authorization error",
    });
  }
};

export default userAuth;