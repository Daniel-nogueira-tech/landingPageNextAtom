import express from "express";
import { createNewsContent, deleteNewsContent, getNewsContent, updateNewsContent } from "../controllers/newsContentController.js";
import userAdminAuth from "../middleware/userAdminMiddleware.js";
import { accessControlMiddleware } from "../middleware/accessControlMiddleware.js";

const router = express.Router();

router.post("/createNewsContent", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), createNewsContent);
router.get("/getNewsContent", getNewsContent);
router.put("/updateNewsContent", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), updateNewsContent);
router.delete("/deleteNewsContent", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), deleteNewsContent);

export default router;