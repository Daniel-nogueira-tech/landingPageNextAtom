import userModels from "../models/userModels.js";
import userAdminModels from "../models/userAdminModels.js";


// get user admin data for admin page
const getUsersAdminData = async (req, res) => {

    try {
        const userId = req.userId;
        //Guards
        const user = await userAdminModels.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        if (user.role !== "admin") {
            return res.json({ success: false, message: "User not verified or not exist" })
        }
        res.status(200).json({
            success: true,
            userAllToAdmin: user.name,
            isAccountVerified: user.isAccountVerified,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//update user plan
const updateUserPlan = async (req, res) => {
    try {
        const { id, plan, email, name } = req.body;
        const userId = req.userId;
        //Guards
        const userAdmin = await userAdminModels.findById(userId);
        if (!userAdmin) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        if (!userAdmin.isAccountVerified || userAdmin.role !== "admin") {
            return res.status(403).json({ success: false, message: "User not verified or not exist" })
        }
        if (!id || !plan || !email || !name) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
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
        const userId = req.userId;
        //Guards
        if (!id) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const user = await userModels.findById(id);
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        const userAdmin = await userAdminModels.findById(userId);
        if (!userAdmin) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        if (!userAdmin.isAccountVerified || userAdmin.role !== "admin") {
            return res.status(403).json({ success: false, message: "User not verified or not exist" })
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
    const userId = req.userId;
    //Guards
    const userAdmin = await userAdminModels.findById(userId);
    if (!userAdmin) {
        return res.status(404).json({ success: false, message: "User not found" })
    }
    if (!userAdmin.isAccountVerified || userAdmin.role !== "admin") {
        return res.status(403).json({ success: false, message: "User not verified or not exist" })
    }
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



export { updateUserPlan, deleteUser, getAllUsersToAdmin, getUsersAdminData };