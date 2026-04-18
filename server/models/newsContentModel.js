import mongoose from "mongoose";

const newsContentSchema = new mongoose.Schema({
    image: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

const NewsContent = mongoose.model("NewsContent", newsContentSchema);
export default NewsContent;