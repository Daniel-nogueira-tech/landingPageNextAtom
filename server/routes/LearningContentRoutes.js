import express from "express";
import { createLearningContent, deleteLearningContent, getLearningContent, updateLearningContent } from "../controllers/LearningContentController.js";

const router = express.Router();

router.post("/createLearningContent", createLearningContent);
router.get("/getLearningContent", getLearningContent);
router.put("/updateLearningContent", updateLearningContent);
router.delete("/deleteLearningContent", deleteLearningContent);

export default router;