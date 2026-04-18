import React, { useState } from 'react';
import './Learn.css';
import { motion } from 'framer-motion';
import { BookOpen, ShieldCheck, Zap, Globe, Cpu, Database, Layers, Image, TrendingUp, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { learnData } from '../../data';

const iconMap = {
    BookOpen: <BookOpen size={40} />,
    Zap: <Zap size={40} />,
    ShieldCheck: <ShieldCheck size={40} />,
    Globe: <Globe size={40} />,
    Cpu: <Cpu size={40} />,
    Database: <Database size={40} />,
    Layers: <Layers size={40} />,
    Image: <Image size={40} />,
    TrendingUp: <TrendingUp size={40} />,
    FileText: <FileText size={40} />
};

const Learn = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(learnData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCards = learnData?.slice(startIndex, startIndex + itemsPerPage) || [];

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <section id="learn" className="learn">
            <div className="container">
                <div className="section-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Aprenda com <span className="text-gradient">Especialistas</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Temos todo o conteúdo que você precisa para sair do zero e se tornar um mestre em criptoativos.
                    </motion.p>
                </div>

                <motion.div
                    key={currentPage}
                    className="learn-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.2 } }
                    }}
                >
                    {currentCards.map((card, index) => (
                        <motion.div
                            key={`${card.id}-${currentPage}`}
                            className="learn-card glass"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                            whileHover={{ y: -10, borderColor: "var(--primary)" }}
                        >
                            <div className="card-icon">{iconMap[card.iconName]}</div>
                            <h3>{card.title}</h3>
                            <p>{card.desc}</p>
                            <Link to={`/aprender/${card.id}`} className="card-link">Saber mais →</Link>
                        </motion.div>
                    ))}
                </motion.div>

                {totalPages > 1 && (
                    <div className="pagination-controls" style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', alignItems: 'center' }}>
                        <button
                            className="btn-primary"
                            style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                        <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>
                            {currentPage} de {totalPages}
                        </span>
                        <button
                            className="btn-primary"
                            style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            Próxima
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Learn;
