import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { newsData } from '../../data';
import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react';
import './NoticiaAberta.css';

const NoticiaAberta = () => {
    const { slug } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        const found = newsData.find(item => item.slug === slug);
        setNewsItem(found);

        // Simple related news: get 3 other news articles
        if (found) {
            const others = newsData.filter(item => item.slug !== slug).slice(0, 3);
            setRelated(others);
        }
    }, [slug]);

    if (!newsItem) return <div className="container" style={{paddingTop: '150px'}}><p>Notícia não encontrada.</p><Link to="/noticias">Voltar para notícias</Link></div>;

    return (
        <motion.section 
            className="noticia-aberta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="container">
                <Link to="/noticias" className="back-link"><ArrowLeft size={18} /> Voltar para Notícias</Link>
                
                <div className="noticia-layout">
                    <article className="noticia-content glass">
                        <span className="category-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '1rem' }}>
                            {newsItem.category}
                        </span>
                        <h1 className="text-gradient">{newsItem.title}</h1>
                        <div className="news-meta list-meta">
                            <span><Calendar size={16} /> {newsItem.date}</span>
                            <span><User size={16} /> {newsItem.author}</span>
                        </div>
                        
                        <div className="noticia-media">
                            <img src={newsItem.image} alt={newsItem.title} />
                        </div>

                        <div className="noticia-body">
                            <p>{newsItem.content}</p>
                            <p>A situação ainda continua em desenvolvimento pelas próximas semanas. Especialistas alertam que todos devem ficar de olho nos graficos e nos relatórios de dados on-chain, pois o fluxo financeiro global ditará o rumo que as negociações tomarão em seguida.</p>
                            <blockquote>"Este é um parágrafo de citação que destaca uma frase muito importante sobre o texto principal, simulando depoimentos e entrevistas de figuras proeminentes do espaço web3."</blockquote>
                            <p>Siga lendo outras matérias do portal para cruzar dados e tirar conclusões assertivas sobre a montagem de seu portfólio no ciclo de alta atual.</p>
                        </div>
                    </article>

                    <aside className="noticia-sidebar">
                        <div className="related-glass glass">
                            <h3>Notícias Relacionadas</h3>
                            <div className="related-list">
                                {related.map(item => (
                                    <Link key={item.slug} to={`/noticias/${item.slug}`} className="related-item">
                                        <div className="related-img">
                                            <img src={item.image} alt={item.title}/>
                                        </div>
                                        <div className="related-text">
                                            <h4>{item.title}</h4>
                                            <span>{item.date}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </motion.section>
    );
};

export default NoticiaAberta;
