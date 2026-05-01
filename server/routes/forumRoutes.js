import express from "express";
import { getForumData, addForumData, deleteForumData, getForumDataAdmin, updateForumDataAdmin, deleteCommentAdmin, addReplyAdmin } from "../controllers/forumController.js";
import userAdminAuth from "../middleware/userAdminMiddleware.js";
import userAuth from "../middleware/userMiddleware.js";
import { accessControlMiddleware } from "../middleware/accessControlMiddleware.js";
import multer from "multer";



const router = express.Router();
// Funções de upload de imagem
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({ storage });

// Rotas públicas user
router.get("/get-forum", userAuth, getForumData);
router.post("/add-forum", upload.single("image"), userAuth, addForumData);
router.delete("/delete-forum", userAuth, deleteForumData);

// Rotas privadas admin
router.get("/get-forum-management", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), getForumDataAdmin);
router.put("/update-forum-management", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), updateForumDataAdmin);
router.delete("/delete-comment-management", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), deleteCommentAdmin);
router.post("/add-reply-management", userAdminAuth, accessControlMiddleware(["admin", "super-admin"]), addReplyAdmin);

export default router;