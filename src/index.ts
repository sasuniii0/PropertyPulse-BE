import express, {Application , Request , Response} from "express"
import authRoute from "./routes/authRoute"
import adminRoute from "./routes/adminRoute"
import userRoute from "./routes/userRoute"
import listningRoute from "./routes/listningRoute"
import savedListningRoute from "./routes/savedListningRoutes"
import aiRoutes from "./routes/aiRoute"
import inquiryRoute from './routes/inquiryRoute'
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
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))

app.use("/api/v1/auth" , authRoute)
app.use("/api/v1/admin" , adminRoute)
app.use("/api/v1/user" ,userRoute)
app.use("/api/v1/listning" , listningRoute)
app.use("/api/v1/savedListnings" , savedListningRoute)
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/inquiries" , inquiryRoute)


mongoose.connect(MONGO_URI).then(() =>{
    console.log("Connected to MongoDB")
}).catch((err) =>{
    console.log("Error connecting to MongoDB" , err)
    process.exit(1)
})

app.listen(SERVER_PORT, () =>{
    console.log("Server is running on port 5000")
})