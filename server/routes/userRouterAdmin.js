import express from "express";
import { updateUserPlan, deleteUser, getAllUsersToAdmin, getUsersAdminData } from "../controllers/userAdminController.js";
import userAdminAuth from "../middleware/userAdminMiddleware.js";
const routerAdmin = express.Router();

routerAdmin.put("/update-plan", userAdminAuth, updateUserPlan);
routerAdmin.delete("/delete-user", userAdminAuth, deleteUser);
routerAdmin.get("/getAllUsersToAdmin", getAllUsersToAdmin);
routerAdmin.get("/getUsersAdminData", userAdminAuth, getUsersAdminData);


export default routerAdmin;