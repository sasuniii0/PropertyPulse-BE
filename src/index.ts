import express, {Application , Request , Response} from "express"
import authRoute from "./routes/authRoute"
import adminRoute from "./routes/adminRoute"
import userRoute from "./routes/userRoute"
import listningRoute from "./routes/listningRoute"
import savedListingRoute from "./routes/savedListningRoutes"
import inquiryRoute from './routes/inquiryRoute'
import paymentRoute from './routes/paymentRoute'
import emailRoute from './routes/emailRoute'
import inquiryEmailRoute from './routes/inquiryEmail'
import comparisonRoute from './routes/comparisonRoute'
import analyticsRoutes from './routes/analyticsRoute'
import { stripeWebhook } from './controllers/stripeWebhook';
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()
const app:Application = express();

const SERVER_PORT = process.env.SERVER_PORT as string
const MONGO_URI = process.env.MONGO_URI as string

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://property-pulse-fe.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow curl or mobile apps
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS not allowed for this origin"), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight OPTIONS request globally
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use("/api/v1/auth" , authRoute)
app.use("/api/v1/admin" , adminRoute)
app.use("/api/v1/user" ,userRoute)
app.use("/api/v1/listning" , listningRoute)
app.use("/api/v1/saved-properties" , savedListingRoute)
app.use("/api/v1/inquiries" , inquiryRoute)
app.use("/api/v1/payment",paymentRoute)
app.post(
  "/api/v1/webhook/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
app.use('/email', emailRoute);
app.use('/email', inquiryEmailRoute);
app.use('/api/properties', comparisonRoute);
app.use('/api/v1/analytics', analyticsRoutes);


mongoose.connect(MONGO_URI).then(() =>{
    console.log("Connected to MongoDB")
}).catch((err) =>{
    console.log("Error connecting to MongoDB" , err)
    process.exit(1)
})

app.listen(SERVER_PORT, () =>{
    console.log("Server is running on port 5000")
})