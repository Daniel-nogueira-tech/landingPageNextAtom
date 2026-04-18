import express from "express";
import { createNewsContent, deleteNewsContent, getNewsContent, updateNewsContent } from "../controllers/newsContentController.js";

const router = express.Router();

router.post("/createNewsContent", createNewsContent);
router.get("/getNewsContent", getNewsContent);
router.put("/updateNewsContent", updateNewsContent);
router.delete("/deleteNewsContent", deleteNewsContent);

export default router;