import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, MessageSquare, ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { forumData } from '../../data';
import CreatePostModal from '../CreatePostModal/CreatePostModal';
import './Forum.css';

const Forum = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localForumData, setLocalForumData] = useState(forumData);

    const handleAddPost = (newPost) => {
        setLocalForumData([newPost, ...localForumData]);
    };

    const filteredData = localForumData.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <motion.section 
            className="forum-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="container">
                <div className="forum-header">
                    <div className="forum-header-text">
                        <h2>Fórum da <span className="text-gradient">Comunidade</span></h2>
                        <p>Tire suas dúvidas, debata ideias e aprenda com a comunidade NextAtom.</p>
                    </div>
                    
                    <button className="btn-primary new-post-btn" onClick={() => setIsModalOpen(true)}>
                        <PlusCircle size={20} /> Nova Pergunta
                    </button>
                </div>

                <div className="forum-filters glass">
                    <div className="search-bar">
                        <Search size={20} color="var(--text-muted)" />
                        <input 
                            type="text" 
                            placeholder="Pesquisar discussões, tags..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-tags">
                        <span className="active">Recentes</span>
                        <span>Populares</span>
                        <span>Sem Resposta</span>
                    </div>
                </div>

                <div className="forum-feed">
                    {filteredData.length > 0 ? filteredData.map((post, index) => (
                        <motion.div 
                            key={post.id} 
                            className="forum-card glass"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <div className="forum-card-votes">
                                <button className="vote-btn"><ArrowBigUp size={24} /></button>
                                <span>{post.upvotes - post.downvotes}</span>
                                <button className="vote-btn"><ArrowBigDown size={24} /></button>
                            </div>
                            
                            <div className="forum-card-content">
                                <Link to={`/forum/topic/${post.id}`}>
                                    <h3>{post.title}</h3>
                                </Link>
                                <p className="forum-excerpt">{post.content}</p>
                                
                                <div className="forum-card-footer">
                                    <div className="forum-author">
                                        <div className="author-avatar">
                                            {post.author.charAt(0)}
                                        </div>
                                        <span className="author-name">{post.author}</span>
                                        <span className="post-date">• {post.date}</span>
                                    </div>
                                    
                                    <div className="forum-tags">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="tag">#{tag}</span>
                                        ))}
                                    </div>

                                    <div className="forum-stats">
                                        <MessageSquare size={16} /> 
                                        <span>{post.comments ? post.comments.length : 0} respostas</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="no-results glass">Nenhuma discussão encontrada para esta pesquisa.</div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <CreatePostModal 
                        onClose={() => setIsModalOpen(false)} 
                        onAdd={(post) => handleAddPost(post)} 
                    />
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default Forum;
