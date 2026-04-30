import express from "express";
import { getUserData } from "../controllers/userController.js";
import userAuth from "../middleware/userMiddleware.js";
import { accessControlMiddleware } from "../middleware/accessControlMiddleware.js";

const userRoute = express.Router();

userRoute.get("/data", userAuth, accessControlMiddleware(["user"]), getUserData);

export default userRoute;
