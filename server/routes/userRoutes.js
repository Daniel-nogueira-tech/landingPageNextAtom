import express from "express";
import getUserData from "../controllers/userController.js";
import userAuth from "../middleware/userMiddleware.js";

const userRoute = express.Router();

userRoute.get("/data", userAuth, getUserData);

export default userRoute;
