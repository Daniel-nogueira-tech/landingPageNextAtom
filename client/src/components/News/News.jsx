import React from 'react';
import './News.css';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { newsData } from '../../data';

const News = () => {
    // Pegar apenas as 3 notícias mais recentes (ou destaques)
    const news = newsData.slice(0, 3);

    return (
        <section id="news" className="news">
            <div className="container">
                <div className="section-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Fique por <span className="text-gradient">Dentro</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Notícias atualizadas, análises técnicas e tudo o que acontece no ecossistema cripto global.
                    </motion.p>
                </div>

                <div className="news-grid">
                    {news.map((item, index) => (
                        <motion.div
                            key={item.slug}
                            className="news-card glass"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
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

                <div className="news-cta">
                    <Link to="/noticias" className="btn-outline">Ver Todas as Notícias</Link>
                </div>
            </div>
        </section>
    );
};

export default News;
