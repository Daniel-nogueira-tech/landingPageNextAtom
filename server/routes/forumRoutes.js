import express from "express";
import { getForumData, addForumData, deleteForumData, getForumDataAdmin, updateForumDataAdmin, deleteCommentAdmin, addCommentAdmin, addReplyAdmin } from "../controllers/forumController.js";

const router = express.Router();

// Rotas públicas
router.get("/get-forum", getForumData);
router.post("/add-forum", addForumData);
router.delete("/delete-forum", deleteForumData);

// Rotas privadas
router.get("/get-forum-management", getForumDataAdmin);
router.put("/update-forum-management", updateForumDataAdmin);
router.delete("/delete-comment-management", deleteCommentAdmin);
router.post("/add-comment-management", addCommentAdmin);
router.post("/add-reply-management", addReplyAdmin);

export default router;