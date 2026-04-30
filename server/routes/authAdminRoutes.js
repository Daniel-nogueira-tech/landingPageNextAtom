import express from "express";
import { registerAdmin, loginAdmin, logoutAdmin, sendVerifyOtpAdmin, verifyEmailAdmin, checkUserAdminAuthenticated, sendPasswordOtpAdmin, resetPasswordAdmin } from "../controllers/authAdminController.js";
import userAdminAuth from "../middleware/userAdminMiddleware.js";
import { accessControlMiddleware } from "../middleware/accessControlMiddleware.js";

const authAdminRoute = express.Router();

authAdminRoute.post("/register", registerAdmin);
authAdminRoute.post("/login", loginAdmin);
authAdminRoute.post("/logout", logoutAdmin);
authAdminRoute.post("/send-verify-otp-admin", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), sendVerifyOtpAdmin);
authAdminRoute.post("/verify-account-admin", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), verifyEmailAdmin);
authAdminRoute.post("/is-admin-authenticated", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), checkUserAdminAuthenticated);

authAdminRoute.post("/send-reset-otp", sendPasswordOtpAdmin);
authAdminRoute.post("/reset-password", resetPasswordAdmin);

export default authAdminRoute;