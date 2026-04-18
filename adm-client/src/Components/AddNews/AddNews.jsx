import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './AddNews.css';
import { useContext } from 'react';
import { ContextApp } from '../../Context/ContextApp';

const AddNews = () => {
    const { addNews, addNewsContent } = useContext(ContextApp);
    const [editingItem, setEditingItem] = useState({
        image: '',
        category: '',
        title: '',
        date: '',
        author: '',
        content: ''
    });

    //função para adicionar notícia
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingItem(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className='content-news-container'>
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
                        <h2>Adicionar Notícia</h2>
                        <Link to="/manage-news">
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
                            <label>Categoria</label>
                            <input
                                type="text"
                                name="category"
                                value={editingItem.category}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>Autor</label>
                            <input
                                type="text"
                                name="author"
                                value={editingItem.author}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>Data</label>
                            <input
                                type="date"
                                name="date"
                                value={editingItem.date}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group" id="url-image">
                            <label>URL da Imagem</label>
                            <input
                                type="text"
                                name="image"
                                value={editingItem.image}
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

                        <Link to="/manage-news">
                            <button className="cancel-btn" >Cancelar</button>
                        </Link>

                        <button className="save-btn purple-gradient" onClick={() => { addNewsContent(editingItem) }} >Salvar Alterações</button>
                    </div>
                </motion.div>
            </div>
            )
        </div>
    )
}

export default AddNews