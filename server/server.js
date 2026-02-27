import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";
import dns from 'dns';
import userRoute from "./routes/userRoutes.js";


dotenv.config();

dns.setServers(['8.8.8.8', '1.1.1.1']);
const allowedOrigins = ["http://localhost:5173"];

// app config
const app = express();
const port = process.env.PORT || 5000;
// db config
connectDB();


// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));


// api routes
app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});