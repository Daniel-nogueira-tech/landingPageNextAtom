import userModels from "../models/userModels.js";
import userAdminModels from "../models/userAdminModels.js";
import mongoose from "mongoose";

//--------------------------/Dados do Admin/--------------------------//

// get user admin data for admin page
const getUsersAdminData = async (req, res) => {
    try {
        const userId = req.userId;
        //Guards
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
        const user = await userAdminModels.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        res.status(200).json({
            success: true,
            userAllToAdmin: user.name,
            isAccountVerified: user.isAccountVerified,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//Edita usuario admin
const updateUserAdmin = async (req, res) => {
    try {
        const { id, name, email, role } = req.body;
        const userId = req.userId;
        console.log(id, name, email, role);
        //Guards
        if (!id || !name || !email || !role) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
        const userAdmin = await userAdminModels.findById(userId);
        if (!userAdmin) {
            return res.json({ success: false, message: "User not found" })
        }
        if (!userAdmin.isAccountVerified) {
            return res.status(403).json({ success: false, message: "User not verified or not exist" })
        }
        //Update 
        const user = await userAdminModels.findByIdAndUpdate(id, { name, email, role },
            { returnDocument: "after", runValidators: true });

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// deleta usuário admin
const deleteUserAdmin = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.userId;
        //Guards
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const user = await userAdminModels.findById(id);
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        //Get userAdmin and check if it is verified
        const userAdmin = await userAdminModels.findById(userId);
        if (!userAdmin) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        if (!userAdmin.isAccountVerified) {
            return res.status(403).json({ success: false, message: "User not verified or not exist" })
        }

        // impede que o admin delete a si mesmo
        if (userAdmin._id.toString() === id) {
            return res.status(403).json({ success: false, message: "User not authorized to delete himself" });
        }
        //Delete user
        await userAdminModels.deleteOne({ _id: id });
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


//--------------------------/Manipular dados do usuário/--------------------------//

// get all users data for admin page
const getAllUserAdminsData = async (req, res) => {
    try {
        const userId = req.userId;
        //Guards
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
        const user = await userAdminModels.find({}, 'name email role');
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        res.status(200).json({
            success: true,
            userAll: user
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
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
        const userAdmin = await userAdminModels.findById(userId);
        if (!userAdmin) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        if (!userAdmin.isAccountVerified) {
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
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
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
        if (!userAdmin.isAccountVerified) {
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
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }
    const userAdmin = await userAdminModels.findById(userId);
    if (!userAdmin) {
        return res.status(404).json({ success: false, message: "User not found" })
    }

    if (!userAdmin.isAccountVerified) {
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



export { updateUserPlan, deleteUser, getAllUsersToAdmin, getUsersAdminData, getAllUserAdminsData, updateUserAdmin, deleteUserAdmin };