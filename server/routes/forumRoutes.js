import express from "express";
import { getForumData, addForumData, deleteForumData, getForumDataAdmin, updateForumDataAdmin, deleteCommentAdmin, addReplyAdmin } from "../controllers/forumController.js";
import userAdminAuth from "../middleware/userAdminMiddleware.js";
import userAuth from "../middleware/userMiddleware.js";
import { accessControlMiddleware } from "../middleware/accessControlMiddleware.js";

const router = express.Router();

// Rotas públicas user
router.get("/get-forum", userAuth, accessControlMiddleware(["admin", "super-admin"]), getForumData);
router.post("/add-forum", userAuth, accessControlMiddleware(["admin", "super-admin"]), addForumData);
router.delete("/delete-forum", userAuth, accessControlMiddleware(["admin", "super-admin"]), deleteForumData);

// Rotas privadas admin
router.get("/get-forum-management", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), getForumDataAdmin);
router.put("/update-forum-management", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), updateForumDataAdmin);
router.delete("/delete-comment-management", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), deleteCommentAdmin);
router.post("/add-reply-management", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), addReplyAdmin);

export default router;