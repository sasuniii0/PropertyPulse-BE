import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/authRoute";
import adminRoute from "./routes/adminRoute";
import userRoute from "./routes/userRoute";
import listningRoute from "./routes/listningRoute";
import savedListingRoute from "./routes/savedListningRoutes";
import inquiryRoute from './routes/inquiryRoute';
import paymentRoute from './routes/paymentRoute';
import emailRoute from './routes/emailRoute';
import inquiryEmailRoute from './routes/inquiryEmail';
import comparisonRoute from './routes/comparisonRoute';
import analyticsRoutes from './routes/analyticsRoute';
import { stripeWebhook } from './controllers/stripeWebhook';

dotenv.config();

const app: Application = express();
const SERVER_PORT = process.env.SERVER_PORT || "5000";
const MONGO_URI = process.env.MONGO_URI || "";

app.use(express.json());

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://property-pulse-fe.vercel.app"
];

// Global CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Only check includes if origin exists
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/listning", listningRoute);
app.use("/api/v1/saved-properties", savedListingRoute);
app.use("/api/v1/inquiries", inquiryRoute);
app.use("/api/v1/payment", paymentRoute);
app.post(
  "/api/v1/webhook/stripe",
  express.raw({ type: "application/json" }), // stripe requires raw body
  stripeWebhook
);
app.use('/email', emailRoute);
app.use('/email', inquiryEmailRoute);
app.use('/api/properties', comparisonRoute);
app.use('/api/v1/analytics', analyticsRoutes);

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Start server
app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
