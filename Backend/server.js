import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import databaseConnection from "./config/mongodb.js";
import taskRouter from "./routes/taskRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
databaseConnection();

// Enable CORS (allow frontend to access backend)
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // frontend URL from env
    credentials: true, // allow cookies & auth headers
  }),
);

// Parse JSON request body
app.use(express.json());

// Parse cookies from request
app.use(cookieParser());

// Task routes
app.use("/api", taskRouter);

// User auth routes
app.use("/user", userRouter);

// Keep awake route
app.get("/keepAwake", (req, res) => {
  res.status(200).send("OK");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});