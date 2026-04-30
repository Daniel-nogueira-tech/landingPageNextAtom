import forumModels from "../models/forumModels.js";
import userAdminModels from "../models/userAdminModels.js";
import userModels from "../models/userModels.js";

// get forum data
const getForumData = async (req, res) => {
    const userId = req.userId;

    const user = await userModels.findById(userId, "role");
    if (!user) {
        return res.status(404).json({ success: false, message: "Usuário não encontrado" });
    }

    try {
        const forumData = await forumModels.find({}).sort({ createdAt: -1 });
        if (!forumData || forumData.length === 0) {
            return res.status(404).json({ success: false, message: "Fórum não encontrado" });
        }
        res.status(200).json({ success: true, forumData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// add forum data
const addForumData = async (req, res) => {
    const userId = req.userId;

    const user = await userModels.findById(userId, "role isAccountVerified");
    if (!user) {
        return res.status(404).json({ success: false, message: "Usuário não encontrado" });
    }
    if (user.isAccountVerified !== true) {
        return res.status(403).json({ success: false, message: "Não autorizado" });
    }
    try {
        const { title, content, author, category, tags, comments, imageUrl, isVerified, views, isPinned } = req.body;

        const forumData = new forumModels({ title, content, author, category, tags, comments, imageUrl, isVerified, views, isPinned });

        await forumData.save();
        res.status(200).json({ success: true, message: "Fórum adicionado com sucesso" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
};

// delete forum data
const deleteForumData = async (req, res) => {
    const userId = req.userId;

    const user = await userModels.findById(userId, "role isAccountVerified");
    if (!user) {
        return res.status(404).json({ success: false, message: "Usuário não encontrado" });
    }
    if (user.isAccountVerified !== true) {
        return res.status(403).json({ success: false, message: "Não autorizado" });
    }
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "ID do fórum não fornecido" });
        }
        const forumData = await forumModels.findByIdAndDelete(id);
        if (!forumData) {
            return res.status(404).json({ success: false, message: "Comentário não encontrado" });
        }
        res.status(200).json({ success: true, message: "Comentário deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


//---------------------/Admin/---------------------//
const getForumDataAdmin = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userAdminModels.findById(userId, "role isAccountVerified");
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado" });
        }
        if (user.isAccountVerified !== true) {
            return res.status(403).json({ success: false, message: "Não autorizado" });
        }
        const forumData = await forumModels.find({}).sort({ createdAt: -1 });
        if (!forumData) {
            return res.status(404).json({ success: false, message: "Fórum não encontrado" });
        }
        res.status(200).json({ success: true, forumData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// update forum data admin
const updateForumDataAdmin = async (req, res) => {
    try {
        const { id, isVerified, isPinned } = req.body;
        const userId = req.userId;

        const user = await userAdminModels.findById(userId, "role isAccountVerified");
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado" });
        }
        if (user.isAccountVerified !== true) {
            return res.status(403).json({ success: false, message: "Não autorizado" });
        }

        if (!id) {
            return res.status(400).json({ success: false, message: "ID do fórum não fornecido" });
        }

        // Garantir que são booleanos
        if (typeof isVerified !== "boolean" || typeof isPinned !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isVerified e isPinned devem ser booleanos"
            });
        }

        const forumData = await forumModels.findByIdAndUpdate(id, { $set: { isVerified, isPinned } }, { returnDocument: "after", runValidators: true });
        if (!forumData) {
            return res.status(404).json({ success: false, message: "Post não encontrado" });
        }
        if (isVerified) {
            res.status(200).json({ success: true, message: "Post ocultado com sucesso 😡" });
        } else {
            res.status(200).json({ success: true, message: "Post atualizado com sucesso 🥲" });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Comentario de admin
const addReplyAdmin = async (req, res) => {
    try {
        const { postId, commentId, replyId, author, content, date, isAdmin } = req.body;

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "postId não fornecido"
            });
        }

        if (!content || !author) {
            return res.status(400).json({
                success: false,
                message: "Dados do comentário não fornecidos"
            });
        }

        const forumData = await forumModels.findById(postId);

        if (!forumData) {
            return res.status(404).json({
                success: false,
                message: "Post não encontrado"
            });
        }

        // 🟢 1. COMENTÁRIO NORMAL
        if (!commentId) {
            forumData.comments.push({
                author,
                content,
                date: date || new Date(),
                isAdmin
            });
        }

        // 🟡 2. REPLY EM COMENTÁRIO
        else if (commentId && !replyId) {
            const comment = forumData.comments.id(new mongoose.Types.ObjectId(commentId));
            if (!comment) {
                return res.status(404).json({
                    success: false,
                    message: "Comentário não encontrado"
                });
            }

            comment.replies.push({
                author,
                content,
                date: date || new Date(),
                isAdmin
            });
        }

        // 🔴 3. REPLY DE REPLY
        else if (commentId && replyId) {
            const comment = forumData.comments.id(commentId);

            if (!comment) {
                return res.status(404).json({
                    success: false,
                    message: "Comentário não encontrado"
                });
            }

            const reply = comment.replies.id(replyId);

            if (!reply) {
                return res.status(404).json({
                    success: false,
                    message: "Reply não encontrado"
                });
            }

            // 👉 cria replies dentro da reply (nível 3)
            if (!reply.replyReply) {
                reply.replyReply = [];
            }

            reply.replyReply.push({
                author,
                content,
                date: date || new Date(),
                isAdmin
            });
        }

        await forumData.save();

        res.status(200).json({
            success: true,
            message: "Resposta adicionada com sucesso"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// delete comment
const deleteCommentAdmin = async (req, res) => {
    try {
        const { postId, commentId, replyId, replyReplyId } = req.body;
        const userId = req.userId;

        const user = await userAdminModels.findById(userId, "role isAccountVerified");
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado" });
        }
        if (user.isAccountVerified !== true) {
            return res.status(403).json({ success: false, message: "Não autorizado" });
        }

        if (!postId) {
            return res.status(400).json({ success: false, message: "postId obrigatório" });
        }

        // 🟢 deletar post
        if (postId && !commentId && !replyId && !replyReplyId) {
            await forumModels.findByIdAndDelete(postId);
            return res.status(200).json({ success: true, message: "Post deletado" });
        }


        // 🟢 deletar comentário
        if (commentId && !replyId && !replyReplyId) {
            await forumModels.findByIdAndUpdate(postId, {
                $pull: { comments: { _id: commentId } }
            });
            return res.status(200).json({ success: true, message: "Comentário deletado" });
        }

        // 🟡 deletar reply
        if (commentId && replyId && !replyReplyId) {
            await forumModels.findByIdAndUpdate(postId, {
                $pull: {
                    "comments.$[].replies": { _id: replyId }
                }
            });
            return res.status(200).json({ success: true, message: "Resposta deletada" });
        }

        // 🔴 deletar reply da reply
        if (postId && commentId && replyId && replyReplyId) {
            await forumModels.findByIdAndUpdate(postId, {
                $pull: {
                    "comments.$[].replies.$[].replyReply": { _id: replyReplyId }
                }
            });
            return res.status(200).json({ success: true, message: "Resposta deletada" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erro interno" });
    }
};

export { getForumData, addForumData, deleteForumData, getForumDataAdmin, updateForumDataAdmin, deleteCommentAdmin, addReplyAdmin };