import express from "express";
import { authorizationAdmin, acceptInvitation, getInvitation, removeInvitation } from "../controllers/authorizationAdminController.js";
import userAdminAuth from "../middleware/userAdminMiddleware.js";
import { accessControlMiddleware } from "../middleware/accessControlMiddleware.js";

const inviteRouter = express.Router();

inviteRouter.post("/invite-admin", userAdminAuth, accessControlMiddleware(["super-admin"]), authorizationAdmin);
inviteRouter.post("/accept-invitation", acceptInvitation);
inviteRouter.get("/get-invitation", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), getInvitation);
inviteRouter.delete("/remove-invitation", userAdminAuth, accessControlMiddleware(["super-admin"]), removeInvitation);

export default inviteRouter;