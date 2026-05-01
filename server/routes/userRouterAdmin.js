import express from "express";
import { updateUserPlan, deleteUser, getAllUsersToAdmin, getUsersAdminData, getAllUserAdminsData, updateUserAdmin, deleteUserAdmin } from "../controllers/userAdminController.js";
import userAdminAuth from "../middleware/userAdminMiddleware.js";
import { accessControlMiddleware } from "../middleware/accessControlMiddleware.js";

const routerAdmin = express.Router();

routerAdmin.put("/update-plan", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), updateUserPlan);
routerAdmin.delete("/delete-user", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), deleteUser);
routerAdmin.get("/getAllUsersToAdmin", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), getAllUsersToAdmin);
routerAdmin.get("/getUsersAdminData", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), getUsersAdminData);
routerAdmin.get("/getAllUserAdminsData", userAdminAuth, accessControlMiddleware(["super-admin"]), getAllUserAdminsData);
routerAdmin.delete("/delete-user-admin", userAdminAuth, accessControlMiddleware(["super-admin"]), deleteUserAdmin);
routerAdmin.put("/update-user-admin", userAdminAuth, accessControlMiddleware(["super-admin"]), updateUserAdmin);


export default routerAdmin;