import express from "express";
import { registerUser, loginUser, logoutUser, sendVerifyOtp, verifyEmail, checkAuth, sendResetOtp, resetPassword } from "../controllers/authController.js";
import userAuth from "../middleware/userMiddleware.js";

const authRoute = express.Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", loginUser);
authRoute.post("/logout", logoutUser);
authRoute.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRoute.post("/verify-account", userAuth, verifyEmail);
authRoute.get("/is-auth", userAuth, checkAuth);
authRoute.post("/send-reset-otp", sendResetOtp);
authRoute.post("/reset-password", resetPassword);

export default authRoute;