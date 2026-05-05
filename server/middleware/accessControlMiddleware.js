import userAdminModels from "../models/userAdminModels.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


export const accessControlMiddleware = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ success: false, message: "unauthorized" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

            const id = new mongoose.Types.ObjectId(decoded.id);
            const user = await userAdminModels.findById(id);

            if (!user) {
                return res.status(401).json({ success: false, message: "unauthorized" });
            }

            if (!user.isAccountVerified) {
                return res.status(401).json({ success: false, message: "account not verified" });
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({ success: false, message: "You don't have permission to do this." });
            }

            req.userId = decoded.id;
            next();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "internal error" });
        }
    };
};