import express from "express";
import { getForumData, addForumData, deleteForumData, getForumDataAdmin, updateForumDataAdmin, deleteCommentAdmin, addReplyAdmin } from "../controllers/forumController.js";
import userAdminAuth from "../middleware/userAdminMiddleware.js";
import userAuth from "../middleware/userMiddleware.js";

const router = express.Router();

// Rotas públicas user
router.get("/get-forum", userAuth, getForumData);
router.post("/add-forum", userAuth, addForumData);
router.delete("/delete-forum", userAuth, deleteForumData);

// Rotas privadas admin
router.get("/get-forum-management", userAdminAuth, getForumDataAdmin);
router.put("/update-forum-management", userAdminAuth, updateForumDataAdmin);
router.delete("/delete-comment-management", userAdminAuth, deleteCommentAdmin);
router.post("/add-reply-management", userAdminAuth, addReplyAdmin);

export default router;