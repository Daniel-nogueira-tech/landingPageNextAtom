import userModels from "../models/userModels.js";

const getUserData = async (req, res) => {
    try {
        const userId = req.userId;

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

export default getUserData;
