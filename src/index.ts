import express, {Application , Request , Response} from "express"
import authRoute from "./routes/authRoute"
import adminRoute from "./routes/adminRoute"
import userRoute from "./routes/userRoute"
import listningRoute from "./routes/listningRoute"
import savedListingRoute from "./routes/savedListningRoutes"
import aiRoutes from "./routes/aiRoute"
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

app.use(cors({
    origin:["http://localhost:5173", "http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
    credentials:true,
}))

app.use("/api/v1/auth" , authRoute)
app.use("/api/v1/admin" , adminRoute)
app.use("/api/v1/user" ,userRoute)
app.use("/api/v1/listning" , listningRoute)
app.use("/api/v1/saved-properties" , savedListingRoute)
app.use("/api/v1/ai", aiRoutes);
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