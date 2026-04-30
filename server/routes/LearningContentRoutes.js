import express from "express";
import { createLearningContent, deleteLearningContent, getLearningContent, updateLearningContent } from "../controllers/LearningContentController.js";
import userAdminAuth from "../middleware/userAdminMiddleware.js";
import { accessControlMiddleware } from "../middleware/accessControlMiddleware.js";


const router = express.Router();

router.post("/createLearningContent", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), createLearningContent);
router.get("/getLearningContent", getLearningContent);
router.put("/updateLearningContent", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), updateLearningContent);
router.delete("/deleteLearningContent", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), deleteLearningContent);

export default router;