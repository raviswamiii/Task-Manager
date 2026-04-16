import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import blackListTokenModel from "../models/blackListToken.js";

const userAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    const blackListed = await blackListTokenModel.findOne({ token });

    if (blackListed) {
      return res.status(403).json({
        success: false,
        message: "Token is invalid (logged out)",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    req.userId = user._id; 
    
    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired, please login again",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authorization error",
    });
  }
};

export default userAuth;
