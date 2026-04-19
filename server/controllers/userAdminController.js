import userModels from "../models/userModels.js";

//update user plan
const updateUserPlan = async (req, res) => {
    try {
        const { id, plan, email, name } = req.body;
        if (!id || !plan || !email || !name) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        const user = await userModels.findByIdAndUpdate(
            id,
            { plan, email, name },
            { returnDocument: "after", runValidators: true }
        );
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        res.status(200).json({
            success: true,
            message: "User plan updated successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await userModels.findById(id);
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        await userModels.deleteOne({ _id: id });
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//get all users to admin
const getAllUsersToAdmin = async (req, res) => {
    try {
        const users = await userModels.find({}, 'name email plan');
        res.status(200).json({
            success: true,
            userAllToAdmin: users
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export { updateUserPlan, deleteUser, getAllUsersToAdmin };