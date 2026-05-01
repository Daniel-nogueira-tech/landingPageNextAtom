import LearningContent from "../models/LearningContentModels.js";
import mongoose from "mongoose";

// pega todos os conteudos
const getLearningContent = async (req, res) => {
    try {
        const learningContent = await LearningContent.find({});
        res.status(200).json({ success: true, learningContent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// cria um novo conteudo
const createLearningContent = async (req, res) => {
    try {
        const { iconName, title, desc, content, videoUrl, imageUrl } = req.body;

        if (!iconName || !title || !desc || !content || !videoUrl || !imageUrl) {
            return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios" });
        }
        const learningContent = new LearningContent({ iconName, title, desc, content, videoUrl, imageUrl });
        await learningContent.save();
        res.status(201).json({ success: true, message: "Conteúdo criado com sucesso" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// atualiza um conteudo
const updateLearningContent = async (req, res) => {
    try {
        const { id, ...data } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "ID é obrigatório!" });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "ID inválido!" });
        }
        const learningContent = await LearningContent.findByIdAndUpdate(id, { $set: data }, { returnDocument: 'after', runValidators: true });
        if (!learningContent) {
            return res.status(404).json({ success: false, message: "Conteúdo não encontrado!" });
        }
        res.status(200).json({ success: true, message: "Conteúdo atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// deleta um conteudo
const deleteLearningContent = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "ID é obrigatório!" });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "ID inválido!" });
        }
        const learningContent = await LearningContent.findByIdAndDelete(id);
        if (!learningContent) {
            return res.status(404).json({ success: false, message: "Conteúdo não encontrado!" });
        }
        res.status(200).json({ success: true, message: "Conteúdo deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export { getLearningContent, createLearningContent, updateLearningContent, deleteLearningContent };