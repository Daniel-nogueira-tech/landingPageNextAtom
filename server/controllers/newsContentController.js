import NewsContent from "../models/newsContentModel.js";


// pega todas as noticias
const getNewsContent = async (req, res) => {
    try {
        const newsContent = await NewsContent.find({});
        res.status(200).json({ success: true, newsContent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// cria uma nova noticia
const createNewsContent = async (req, res) => {
    try {
        const { image, category, title, date, author, content } = req.body;

        if (!image || !category || !title || !date || !author || !content) {
            return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios" });
        }
        const newsContent = new NewsContent({ image, category, title, date, author, content });
        await newsContent.save();
        res.status(201).json({ success: true, message: "Notícia criada com sucesso" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// atualiza uma noticia
const updateNewsContent = async (req, res) => {
    try {
        const { id, ...data } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "ID é obrigatório!" });
        }

        const newsContent = await NewsContent.findByIdAndUpdate(id, { $set: data }, { returnDocument: 'after', runValidators: true });
        if (!newsContent) {
            return res.status(404).json({ success: false, message: "Notícia não encontrada!" });
        }
        res.status(200).json({ success: true, message: "Notícia atualizada com sucesso!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// deleta uma noticia
const deleteNewsContent = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "ID é obrigatório!" });
        }
        const newsContent = await NewsContent.findByIdAndDelete(id);
        if (!newsContent) {
            return res.status(404).json({ success: false, message: "Notícia não encontrada!" });
        }
        res.status(200).json({ success: true, message: "Notícia deletada com sucesso!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export { getNewsContent, createNewsContent, updateNewsContent, deleteNewsContent };