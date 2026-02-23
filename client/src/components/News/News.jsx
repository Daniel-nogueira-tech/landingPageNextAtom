import React from 'react';
import './News.css';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const News = () => {
    const news = [
        {
            image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&auto=format&fit=crop&q=60",
            category: "Mercado",
            title: "Bitcoin ultrapassa marca Histórica de $100k",
            date: "02 Fev, 2026",
            author: "Admin"
        },
        {
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&auto=format&fit=crop&q=60",
            category: "Segurança",
            title: "Como proteger seus NFTs de ataques Phishing",
            date: "01 Fev, 2026",
            author: "Tech Team"
        },
        {
            image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=500&auto=format&fit=crop&q=60",
            category: "Regulação",
            title: "Novas leis para Criptoativos na América Latina",
            date: "30 Jan, 2026",
            author: "Legal"
        }
    ];

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
                            key={index}
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
                                <a href="#" className="read-more">
                                    Ler Notícia <ArrowRight size={16} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="news-cta">
                    <button className="btn-outline">Ver Todas as Notícias</button>
                </div>
            </div>
        </section>
    );
};

export default News;
