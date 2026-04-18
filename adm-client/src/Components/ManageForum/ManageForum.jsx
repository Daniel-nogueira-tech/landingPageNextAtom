import React, { useState, useEffect, useContext } from 'react';
import './ManageForum.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, EyeOff, Eye, ShieldCheck, ChevronDown, ChevronUp, Send } from 'lucide-react';
import Sidebar from '../Sidebar/Sidebar';
import { Atom } from 'react-loading-indicators';
import { ContextApp } from '../../Context/ContextApp';


const ManageForum = () => {
    const { forumContent, getForumContent, deleteForumContent, editForumContent, addReplyForum } = useContext(ContextApp);
    console.log(forumContent);
    const [expandedId, setExpandedId] = useState(null);
    const [replyTexts, setReplyTexts] = useState({});
    const [replyToReply, setReplyToReply] = useState({});
    const [search, setSearch] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(forumContent);


    useEffect(() => {
        getForumContent();
    }, []);

    // toggle para expandir e recolher post
    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // editar post visualização
    const editPost = (id, isVerified) => {
        editForumContent(id, isVerified);
    };

    // adcionar resposta
    const addReply = (postId) => {
        const content = replyTexts[postId];
        addReplyForum(postId, null, null, {
            author: "Admin Oficial",
            content,
            isAdmin: true,
            date: new Date()
        });
        setReplyTexts(prev => ({
            ...prev,
            [postId]: ''
        }));
    };

    // handle para adicionar resposta
    const handleReplyChange = (postId, text) => {
        setReplyTexts({
            ...replyTexts,
            [postId]: text
        });
    };

    // adcionar resposta
    const addReplyToReply = (postId, commentId, replyId) => {
        const content = replyToReply[replyId];

        addReplyForum(postId, commentId, replyId, {
            author: "Admin Oficial",
            content,
            isAdmin: true,
            date: new Date()
        });

        setReplyToReply(prev => ({
            ...prev,
            [replyId]: ''
        }));
    };

    // handle para adicionar resposta
    const handleReplyChangeToReply = (replyId, text) => {
        setReplyToReply(prev => ({
            ...prev,
            [replyId]: text
        }));
    };;


    useEffect(() => {
        if (!search) {
            setFilteredPosts(forumContent);
            return;
        }
        const searchTerm = search.toLowerCase();

        const fields = ['title', 'category', 'date', 'author', 'content', '_id', 'isVerified', 'comments.content', 'comments.author', 'comments.isAdmin'];

        const filtered = forumContent.filter(item =>
            fields.some(field =>
                String(item[field] || '')
                    .toLowerCase()
                    .includes(searchTerm)
            )
        );

        setFilteredPosts(filtered);
    }, [search, forumContent]);



    return (
        <div className="admin-dashboard-container">
            <Sidebar />
            <main className="admin-main-content">
                <div className="mf-header">
                    <h2>Gerenciamento do <span className="mf-highlight">Fórum</span></h2>
                    <p>Modere conteúdos, forneça suporte oficial e mantenha a comunidade segura.</p>
                </div>

                <div className="mf-feed">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Buscar posts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="mf-search-input"
                        />
                    </div>

                    {filteredPosts && filteredPosts.length > 0 && filteredPosts.map((post) => (
                        <motion.div
                            key={post._id}
                            className={`mf-card glass ${post.isVerified ? 'hidden-post' : 'active-post'}`}
                            layout
                        >
                            <div className="mf-card-summary" onClick={() => toggleExpand(post._id)}>
                                <div className="mf-card-info">
                                    <h3>{post.title}</h3>
                                    <div className="mf-card-meta">
                                        <span>Por <strong>{post.author}</strong></span>
                                        <span>• {post.date}</span>
                                        <span className={`mf-badge ${post.isVerified ? 'badge-amber' : 'badge-emerald'}`}>
                                            {post.isVerified ? 'Oculto' : 'Ativo'}
                                        </span>
                                    </div>
                                    {post.isVerified && (
                                        <div className="mf-invisible-warning">⚠️ Post Invisível para o Público</div>
                                    )}
                                </div>
                                <div className="mf-card-controls" onClick={e => e.stopPropagation()}>
                                    <button className="mf-btn-icon mf-toggle" onClick={() => editPost(post._id, post.isVerified)}>
                                        {post.isVerified ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                    <button className="mf-btn-icon mf-delete" onClick={() => deleteForumContent(post.comments._id, post._id,)}>
                                        <Trash2 size={20} />
                                    </button>
                                    <button className="mf-btn-icon mf-expand" onClick={() => toggleExpand(post._id)}>
                                        {expandedId === post._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedId === post._id && (
                                    <motion.div
                                        className="mf-card-details"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="mf-post-content glass-inset">
                                            <h4>Conteúdo do Tópico:</h4>
                                            <p>{post.content}</p>
                                        </div>

                                        <div className="mf-comments-section">
                                            <h4>Comentários ({post.comments.length})</h4>
                                            {post.comments.length === 0 && <p className="text-muted">Nenhum comentário ainda.</p>}

                                            <div className="mf-comments-list">
                                                {post.comments.map(comment => (
                                                    <div key={comment._id} className={`mf-comment-item ${comment.isAdmin ? 'admin-comment' : ''}`}>
                                                        <div className="mf-comment-header">
                                                            <span className="mf-comment-author">
                                                                {comment.author}
                                                                {comment.isAdmin && <span className="admin-badge"><ShieldCheck size={14} /> Oficial/Admin</span>}
                                                            </span>
                                                            <button className="mf-btn-icon mf-delete" onClick={() => deleteForumContent(comment._id, post._id)}>
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                        <p>{comment.content}</p>

                                                        {/** Respostas */}
                                                        {comment.replies.map(reply => (
                                                            <div key={reply._id} className={`mf-comment-item ${reply.isAdmin ? 'admin-comment' : ''}`}>
                                                                <div className="mf-comment-header " >
                                                                    <span className="mf-comment-author">
                                                                        <p style={{ color: '#bc13fe' }}>Resposta:</p>
                                                                        {reply.author}
                                                                        {reply.isAdmin && <span className="admin-badge" ><ShieldCheck size={14} /> Oficial/Admin</span>}
                                                                    </span>
                                                                    <button className="mf-btn-icon mf-delete" onClick={() => deleteForumContent(comment._id, post._id, reply._id)}>
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                </div>
                                                                <p>{reply.content}</p>


                                                                {/* camada 3 de resposta */}
                                                                {reply.replyReply && reply.replyReply.map(reply2 => (
                                                                    <div
                                                                        key={reply2._id}
                                                                        className={`mf-comment-item ${reply2.isAdmin ? 'admin-comment' : ''}`}
                                                                    >
                                                                        <div className="mf-comment-header">
                                                                            <span className="mf-comment-author">
                                                                                <p style={{ color: '#00e1ffff' }}>Resposta:</p>
                                                                                {reply2.author}
                                                                                {reply2.isAdmin && (
                                                                                    <span className="admin-badge">
                                                                                        <ShieldCheck size={14} /> Oficial/Admin
                                                                                    </span>
                                                                                )}
                                                                            </span>

                                                                            <button
                                                                                className="mf-btn-icon mf-delete"
                                                                                onClick={() => deleteForumContent(comment._id, post._id, reply._id, reply2._id)}
                                                                            >
                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                        </div>

                                                                        <p>{reply2.content}</p>
                                                                    </div>
                                                                ))}



                                                                {/** camada 2 de respostas*/}
                                                                <div className="mf-reply-box" style={{ display: reply.isAdmin ? 'none' : 'block' }}>
                                                                    <div className="mf-reply-input-wrapper"
                                                                        key={reply._id}
                                                                    >
                                                                        <ShieldCheck size={20} className="mf-input-icon admin-color" />
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Adicionar resposta oficial como Admin..."
                                                                            value={replyToReply[reply._id] || ''}
                                                                            onChange={(e) => handleReplyChangeToReply(reply._id, e.target.value)}
                                                                            onKeyDown={(e) => e.key === 'Enter' && addReplyToReply(post._id, comment._id, reply._id)}
                                                                        />
                                                                        <button className="mf-send-reply" onClick={() => addReplyToReply(post._id, comment._id, reply._id)}>
                                                                            <Send size={18} />
                                                                        </button>
                                                                    </div>
                                                                </div>


                                                            </div>
                                                        ))}

                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mf-reply-box">
                                                <div className="mf-reply-input-wrapper"
                                                    key={post._id}
                                                >
                                                    <ShieldCheck size={20} className="mf-input-icon admin-color" />
                                                    <input
                                                        type="text"
                                                        placeholder="Adicionar resposta oficial como Admin..."
                                                        value={replyTexts[post._id] || ''}
                                                        onChange={(e) => handleReplyChange(post._id, e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && addReply(post._id)}
                                                    />
                                                    <button className="mf-send-reply" onClick={() => addReply(post._id)}>
                                                        <Send size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                    {forumContent && forumContent.length === 0 && (
                        <Atom color="#8A2BE2" size={50} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default ManageForum;