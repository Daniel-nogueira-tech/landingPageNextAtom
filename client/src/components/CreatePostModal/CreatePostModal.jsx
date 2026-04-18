import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import './CreatePostModal.css';

const CreatePostModal = ({ onClose, onAdd }) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Discussão");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        setTimeout(() => {
            const newPost = {
                id: `topic-${Date.now()}`,
                title,
                content,
                author: "Você", // Simulated
                category,
                tags: tags.split(',').map(t => t.trim()).filter(t => t !== ""),
                date: "Agora mesmo",
                upvotes: 0,
                downvotes: 0,
                comments: [],
                imageUrl: imagePreview || ""
            };
            onAdd(newPost);
            onClose();
        }, 800);
    };

    return (
        <div className="modal-overlay">
            <motion.div 
                className="modal-content create-post-modal glass"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
                <div className="modal-header">
                    <h3>Nova <span className="text-gradient">Pergunta</span></h3>
                    <button className="close-btn" onClick={onClose}><X size={24} /></button>
                </div>

                <form className="modal-body" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Título do Tópico</label>
                        <input 
                            type="text" 
                            placeholder="Seja específico sobre sua dúvida ou discussão" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Categoria</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option>Discussão</option>
                                <option>Iniciante</option>
                                <option>Tecnologia</option>
                                <option>Regulação</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tags (separadas por vírgula)</label>
                            <input 
                                type="text" 
                                placeholder="ex: Bitcoin, Trading, Dúvida" 
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Conteúdo</label>
                        <textarea 
                            rows={6} 
                            placeholder="Descreva todos os detalhes da sua pergunta..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group image-upload-group">
                        <label className="image-upload-btn">
                            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                            <ImageIcon size={20} /> Anexar Imagem Contextual (Opcional)
                        </label>
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                                <button type="button" onClick={() => {setImagePreview(null); setImageFile(null);}}>Remover</button>
                            </div>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-outline" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Publicando...' : <><CheckCircle size={18} /> Publicar Pergunta</>}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreatePostModal;
