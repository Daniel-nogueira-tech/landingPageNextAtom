import userModels from "../models/userModels.js";
import mongoose from "mongoose";

//get user data
const getUserData = async (req, res) => {
    try {
        const userId = req.userId;
        //Guards
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
        const user = await userModels.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        res.status(200).json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};





export { getUserData };
