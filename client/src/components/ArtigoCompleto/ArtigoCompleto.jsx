import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { learnData } from '../../data';
import { ArrowLeft } from 'lucide-react';
import './ArtigoCompleto.css';

const ArtigoCompleto = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const found = learnData.find(item => item.id === id);
        setArticle(found);
    }, [id]);

    if (!article) return <div className="container" style={{paddingTop: '150px'}}><p>Artigo não encontrado.</p><Link to="/">Voltar</Link></div>;

    return (
        <motion.section 
            className="artigo-completo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="container">
                <Link to="/#learn" className="back-link"><ArrowLeft size={18} /> Voltar</Link>
                <div className="artigo-content glass">
                    <h1 className="text-gradient">{article.title}</h1>
                    <p className="artigo-desc">{article.desc}</p>
                    
                    {article.imageUrl && (
                        <div className="artigo-media">
                            <img src={article.imageUrl} alt={article.title} />
                        </div>
                    )}

                    <div className="artigo-body">
                        <p>{article.content}</p>
                        {/* Simulate more content reading */}
                        <p>O conceito continua sendo aprofundado aqui. Este é apenas um texto simulado indicando como a teoria apresentada se aplicaria no desenvolvimento diário ou no investimento...</p>
                    </div>

                    {article.videoUrl && (
                        <div className="artigo-video">
                            {/* Um placeholder para vídeo real */}
                            <div className="video-placeholder">Vídeo: {article.title}</div>
                        </div>
                    )}
                </div>
            </div>
        </motion.section>
    );
};

export default ArtigoCompleto;
