import express from "express";
import { updateUserPlan, deleteUser, getAllUsersToAdmin } from "../controllers/userAdminController.js";

const routerAdmin = express.Router();

routerAdmin.put("/update-plan", updateUserPlan);
routerAdmin.delete("/delete-user", deleteUser);
routerAdmin.get("/getAllUsersToAdmin", getAllUsersToAdmin);


export default routerAdmin;