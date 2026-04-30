import express from "express";
import { registerUser, loginUser, logoutUser, sendVerifyOtp, verifyEmail, checkAuth, sendResetOtp, resetPassword } from "../controllers/authController.js";
import userAuth from "../middleware/userMiddleware.js";
import { accessControlMiddleware } from "../middleware/accessControlMiddleware.js";

const authRoute = express.Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", loginUser);
authRoute.post("/logout", logoutUser);
authRoute.post("/send-verify-otp", userAuth, accessControlMiddleware(["user"]), sendVerifyOtp);
authRoute.post("/verify-account", userAuth, accessControlMiddleware(["user"]), verifyEmail);
authRoute.get("/is-auth", userAuth, accessControlMiddleware(["user"]), checkAuth);
authRoute.post("/send-reset-otp", sendResetOtp);
authRoute.post("/reset-password", resetPassword);

export default authRoute;