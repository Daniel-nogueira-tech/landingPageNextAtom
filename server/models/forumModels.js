import mongoose from "mongoose";

// 🔹 Schema de re-respostas
const replyReplySchema = new mongoose.Schema({
    author: String,
    content: String,
    date: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false }
});
// 🔹 Schema de respostas
const replySchema = new mongoose.Schema({
    author: String,
    content: String,
    date: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },

    replyReply: [replyReplySchema]
});


// 🔹 Schema de comentários
const commentSchema = new mongoose.Schema({
    author: String,
    content: String,
    date: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },

    //  Array de respostas dentro do comentário
    replies: [replySchema],
});

// 🔹 Schema principal
const forumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },

    //  agora usa commentSchema
    comments: [commentSchema],

    imageUrl: { type: String, default: "" },
    isVerified: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    isPinned: { type: Boolean, default: false },

}, { timestamps: true });

const forumModels = mongoose.model("Forum", forumSchema);
export default forumModels;