import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowBigUp, ArrowBigDown, Share2, Reply, MessageSquare } from 'lucide-react';
import { forumData } from '../../data';
import './ForumTopic.css';

const ForumTopic = () => {
    const { id } = useParams();
    const [topic, setTopic] = useState(null);
    const [replyText, setReplyText] = useState("");

    useEffect(() => {
        const found = forumData.find(item => item.id === id);
        setTopic(found);
    }, [id]);

    const handleReply = (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        const newComment = {
            id: `reply-${Date.now()}`,
            author: "Você",
            content: replyText
        };

        setTopic(prev => ({
            ...prev,
            comments: [...prev.comments, newComment]
        }));
        setReplyText("");
    };

    if (!topic) return <div className="container" style={{paddingTop: '150px'}}><p>Tópico não encontrado.</p><Link to="/forum">Voltar para o fórum</Link></div>;

    return (
        <motion.section 
            className="forum-topic-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="container">
                <Link to="/forum" className="back-link"><ArrowLeft size={18} /> Voltar para o Fórum</Link>

                <div className="topic-main-container glass">
                    <div className="topic-header-meta">
                        <div className="author-info">
                            <div className="author-avatar">{topic.author.charAt(0)}</div>
                            <div className="author-details">
                                <span className="author-name">{topic.author}</span>
                                <span className="topic-date">{topic.date} em <span className="category-tag">{topic.category}</span></span>
                            </div>
                        </div>
                    </div>

                    <h1 className="topic-title text-gradient">{topic.title}</h1>
                    
                    <div className="topic-body">
                        <p>{topic.content}</p>
                        {topic.imageUrl && (
                            <div className="topic-image">
                                <img src={topic.imageUrl} alt="Anexo do tópico" />
                            </div>
                        )}
                    </div>

                    <div className="topic-tags">
                        {topic.tags.map(tag => (
                            <span key={tag} className="tag">#{tag}</span>
                        ))}
                    </div>

                    <div className="topic-actions">
                        <div className="vote-group">
                            <button className="icon-btn"><ArrowBigUp size={24} /></button>
                            <span className="vote-count">{topic.upvotes - topic.downvotes}</span>
                            <button className="icon-btn"><ArrowBigDown size={24} /></button>
                        </div>
                        
                        <div className="action-group">
                            <button className="icon-btn"><MessageSquare size={20} /> {topic.comments.length}</button>
                            <button className="icon-btn"><Share2 size={20} /> Compartilhar</button>
                        </div>
                    </div>
                </div>

                <div className="comments-section">
                    <h3>Respostas ({topic.comments.length})</h3>
                    
                    <div className="comments-list">
                        {topic.comments.map((comment, index) => (
                            <motion.div 
                                key={comment.id}
                                className="comment-card glass"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="author-info comment-author">
                                    <div className="author-avatar small-avatar">{comment.author.charAt(0)}</div>
                                    <span className="author-name">{comment.author}</span>
                                </div>
                                <div className="comment-body">
                                    <p>{comment.content}</p>
                                </div>
                                <div className="comment-actions">
                                    <button className="icon-btn small-btn"><ArrowBigUp size={18} /> 0</button>
                                    <button className="icon-btn small-btn"><Reply size={16} /> Responder</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <form className="reply-form glass" onSubmit={handleReply}>
                        <h4>Adicionar uma Resposta</h4>
                        <textarea 
                            rows={4} 
                            placeholder="Escreva sua contribuição para a discussão..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        ></textarea>
                        <div className="reply-form-footer">
                            <button type="submit" className="btn-primary">Publicar Resposta</button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.section>
    );
};

export default ForumTopic;
