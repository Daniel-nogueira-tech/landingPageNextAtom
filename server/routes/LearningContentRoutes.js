import express from "express";
import { createLearningContent, deleteLearningContent, getLearningContent, updateLearningContent } from "../controllers/LearningContentController.js";
import userAdminAuth from "../middleware/userAdminMiddleware.js";


const router = express.Router();

router.post("/createLearningContent", userAdminAuth, createLearningContent);
router.get("/getLearningContent", getLearningContent);
router.put("/updateLearningContent", userAdminAuth, updateLearningContent);
router.delete("/deleteLearningContent", userAdminAuth, deleteLearningContent);

export default router;