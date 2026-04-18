import React, { useState, useEffect, useContext } from 'react';
import './ManageNews.css';
import Sidebar from '../Sidebar/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { ContextApp } from '../../Context/ContextApp';
import { Atom } from 'react-loading-indicators';



const ManageNews = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredNews, setFilteredNews] = useState([]);
    const { getNewsContent, newsContent, deleteNewsContent, editNewsContent } = useContext(ContextApp);

    useEffect(() => {
        getNewsContent();
    }, []);

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

    // Variantes de entrada lista
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    useEffect(() => {
        if (!search) {
            setFilteredNews(newsContent);
            return;
        }
        const searchTerm = search.toLowerCase();

        const fields = ['title', 'category', 'date', 'author', 'content', '_id'];

        const filtered = newsContent.filter(item =>
            fields.some(field =>
                String(item[field] || '')
                    .toLowerCase()
                    .includes(searchTerm)
            )
        );

        setFilteredNews(filtered);
    }, [search, newsContent]);

    return (
        <div className="admin-dashboard-container">
            <Sidebar />

            <main className="admin-main-content">
                <header className="main-header">
                    <h1>Gerenciar Notícias</h1>
                </header>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Pesquisar notícias"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="news-list-container glass-panel">
                    <motion.ul
                        className="news-list"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >

                        {filteredNews && filteredNews.length > 0 && filteredNews.map((item, index) => (
                            <motion.li
                                key={index}
                                className="news-row"
                                variants={rowVariants}
                            >
                                <div className="news-info">
                                    <img src={item.image} alt={item.title} className="news-thumbnail" />
                                    <div className="news-details">
                                        <span className="news-category">{item.category}</span>
                                        <h3>{item.title}</h3>
                                        <span className="news-meta">{item.date} • {item.author}</span>
                                        <span className="news-id" style={{ fontSize: "0.6rem" }}>ID: {item._id}</span>
                                    </div>
                                </div>
                                <div className="news-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(item)}
                                        title="Editar Notícia"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="delete-btn-neon"
                                        onClick={() => deleteNewsContent(item._id)}
                                        title="Remover Notícia"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </motion.li>
                        ))}
                        {newsContent && newsContent.length === 0 && (
                            <Atom color="#8A2BE2" size={50} />
                        )}
                    </motion.ul>
                </div>
            </main>

            {/* Modal de Atualização */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <motion.div
                            className="modal-content glassmorphism-deep"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        >
                            <div className="modal-header">
                                <h2>Editar Notícia</h2>
                                <button className="close-btn" onClick={closeModal} title="Fechar">
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group">
                                    <label>ID</label>
                                    <input
                                        type="text"
                                        name="_id"
                                        value={editingItem._id}
                                        onChange={handleInputChange}
                                        disabled
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
                                    <label>Categoria</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={editingItem.category}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Data</label>
                                    <input
                                        type="text"
                                        name="date"
                                        value={editingItem.date}
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
                                    <label>URL da Imagem</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={editingItem.image}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group full-width">
                                    <label>Conteúdo da Notícia</label>
                                    <textarea
                                        name="content"
                                        value={editingItem.content}
                                        onChange={handleInputChange}
                                        rows="6"
                                        className="large-textarea"
                                        spellCheck="false"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="cancel-btn" onClick={closeModal}>Cancelar</button>
                                <button className="save-btn purple-gradient" onClick={() => { closeModal(); editNewsContent(editingItem) }}>Salvar Alterações</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ManageNews;