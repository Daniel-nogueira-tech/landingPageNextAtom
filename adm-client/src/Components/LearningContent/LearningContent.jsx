import React, { useState, useEffect, useContext } from 'react';
import './LearningContent.css';
import Sidebar from '../Sidebar/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { ContextApp } from '../../Context/ContextApp';
import { Atom } from 'react-loading-indicators';



const LearningContent = () => {

    const { contents, setContents, deleteLearningContent, getLearningContent, editLearningContent } = useContext(ContextApp);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredContents, setFilteredContents] = useState([]);

    // Fechar popup pressionando tecla Esc
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        getLearningContent();
    }, []);


    const handleEdit = (item) => {
        setEditingItem({ ...item });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingItem(prev => ({ ...prev, [name]: value }));
    };

    // Search
    useEffect(() => {
        if (!search) {
            setFilteredContents(contents);
            return;
        }
        const searchTerm = search.toLowerCase();

        const fields = ['title', 'category', 'date', 'author', 'content', '_id'];

        const filtered = contents.filter(item =>
            fields.some(field =>
                String(item[field] || '')
                    .toLowerCase()
                    .includes(searchTerm)
            )
        );

        setFilteredContents(filtered);
    }, [search, contents]);


    return (
        <div className="admin-dashboard-container">
            <Sidebar />

            <main className="admin-main-content">
                <header className="main-header">
                    <h1>Gerenciar Conteúdo de Aprendizado</h1>
                </header>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar conteúdo de aprendizado..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <motion.div className="content-list-container glass-panel">
                    <ul className="content-list">
                        {filteredContents && filteredContents.length > 0 && filteredContents.map((item, key) => (
                            <li key={key} className="content-card">
                                <div className="card-image">
                                    <img src={item.imageUrl} alt={item.title} />
                                </div>
                                <div className="card-info">
                                    <h3>{item.title}</h3>
                                    <span className="card-id">ID: {item._id}</span>
                                </div>
                                <div className="card-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(item)}
                                        title="Editar Conteúdo"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteLearningContent(item._id)}
                                        title="Deletar Conteúdo"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </li>
                        ))}
                        {!contents || contents.length === 0 && (
                            <Atom color="#8A2BE2" size={50} />
                        )}
                    </ul>
                </motion.div>
            </main>

            {/* Modal de Atualização (Popup) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <motion.div
                            className="modal-content glassmorphism-deep"
                            onClick={(e) => e.stopPropagation()} // Impede que o clique na caixa feche o popup
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="modal-header">
                                <h2>Editar Conteúdo</h2>
                                <button className="close-btn" onClick={closeModal}>
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group">
                                    <label>ID</label>
                                    <input
                                        type="text"
                                        name="id"
                                        value={editingItem._id}
                                        onChange={handleInputChange}
                                        disabled // ID como chave, ideal não ser muito editado facilmente
                                    />
                                </div>
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
                                <div className="input-group">
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
                                <button className="cancel-btn" onClick={closeModal}>Cancelar</button>
                                <button className="save-btn purple-gradient" onClick={() => { closeModal(); editLearningContent(editingItem) }} >Salvar Alterações</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default LearningContent;