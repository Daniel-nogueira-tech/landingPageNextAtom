import mongoose from "mongoose";

const LearningContentRoutes = new mongoose.Schema({
    iconName: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    content: { type: String, required: true },
    videoUrl: { type: String, required: true },
    imageUrl: { type: String, required: true },
})

const learningContentModel = mongoose.model("LearningContent", LearningContentRoutes);

export default learningContentModel;
