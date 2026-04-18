import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './LearningAdd.css';
import { useContext } from 'react';
import { ContextApp } from '../../Context/ContextApp';


const LearningAdd = () => {
    const { addLearningContent } = useContext(ContextApp);
    const [editingItem, setEditingItem] = useState({
        title: '',
        iconName: '',
        desc: '',
        videoUrl: '',
        imageUrl: '',
        content: ''
    });



    // Manipula a digitação dos inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingItem(prev => ({ ...prev, [name]: value }));
    };


    return (
        <div className="content-learning-container">
            {/* Modal de Atualização (Popup) */}
            (
            <div className="modal-overlay">
                <motion.div
                    className="modal-content glassmorphism-deep"
                    onClick={(e) => e.stopPropagation()} // Impede que o clique na caixa feche o popup
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="modal-header">
                        <h2>Adicionar Conteúdo Curso/Aula</h2>
                        <Link to="/learning-content">
                            <button className="close-btn" >
                                <FaTimes />
                            </button></Link>
                    </div>

                    <div className="modal-body">

                        <div className="input-group">
                            <label>Título</label>
                            <input
                                type="text"
                                name="title"
                                value={editingItem.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>Nome do Ícone</label>
                            <input
                                type="text"
                                name="iconName"
                                value={editingItem.iconName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>Descrição Curta</label>
                            <input
                                type="text"
                                name="desc"
                                value={editingItem.desc}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>URL do Vídeo</label>
                            <input
                                type="text"
                                name="videoUrl"
                                value={editingItem.videoUrl}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group" id="url-image">
                            <label>URL da Imagem</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={editingItem.imageUrl}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group full-width">
                            <label>Conteúdo Completo (Texto/HTML)</label>
                            <textarea
                                name="content"
                                value={editingItem.content}
                                onChange={handleInputChange}
                                rows="4"
                            ></textarea>
                        </div>
                    </div>

                    <div className="modal-footer">

                        <Link to="/learning-content">
                            <button className="cancel-btn" >Cancelar</button>
                        </Link>

                        <button className="save-btn purple-gradient" onClick={() => { addLearningContent(editingItem) }} >Salvar Alterações</button>
                    </div>
                </motion.div>
            </div>
            )
        </div>
    )
}

export default LearningAdd