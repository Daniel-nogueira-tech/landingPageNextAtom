import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { newsData } from '../../data';
import './VerTodasNoticias.css';

const VerTodasNoticias = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const totalPages = Math.ceil(newsData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentNews = newsData.slice(startIndex, startIndex + itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        window.scrollTo(0, 0);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        window.scrollTo(0, 0);
    };

    return (
        <motion.section 
            className="ver-todas-noticias"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="container">
                <Link to="/#news" className="back-link"><ArrowLeft size={18} /> Voltar para Home</Link>
                
                <div className="section-header" style={{ marginBottom: '3rem' }}>
                    <h2>Todas as <span className="text-gradient">Notícias</span></h2>
                    <p>Mantenha-se atualizado com tudo o que acontece no mundo cripto.</p>
                </div>

                <div className="news-grid">
                    {currentNews.map((item, index) => (
                        <motion.div
                            key={item.slug}
                            className="news-card glass"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="news-image">
                                <img src={item.image} alt={item.title} />
                                <span className="category-badge">{item.category}</span>
                            </div>
                            <div className="news-info">
                                <div className="news-meta">
                                    <span><Calendar size={14} /> {item.date}</span>
                                    <span><User size={14} /> {item.author}</span>
                                </div>
                                <h3>{item.title}</h3>
                                <Link to={`/noticias/${item.slug}`} className="read-more">
                                    Ler Notícia <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="pagination-controls">
                        <button 
                            className={`btn-primary ${currentPage === 1 ? 'disabled' : ''}`} 
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                        <span className="page-info">Página {currentPage} de {totalPages}</span>
                        <button 
                            className={`btn-primary ${currentPage === totalPages ? 'disabled' : ''}`} 
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            Próxima
                        </button>
                    </div>
                )}
            </div>
        </motion.section>
    );
};

export default VerTodasNoticias;
