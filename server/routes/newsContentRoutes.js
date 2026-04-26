import express from "express";
import { createNewsContent, deleteNewsContent, getNewsContent, updateNewsContent } from "../controllers/newsContentController.js";
import userAdminAuth from "../middleware/userAdminMiddleware.js";


const router = express.Router();

router.post("/createNewsContent", userAdminAuth, createNewsContent);
router.get("/getNewsContent", getNewsContent);
router.put("/updateNewsContent", userAdminAuth, updateNewsContent);
router.delete("/deleteNewsContent", userAdminAuth, deleteNewsContent);

export default router;