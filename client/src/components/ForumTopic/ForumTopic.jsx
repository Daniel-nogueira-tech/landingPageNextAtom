import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowBigUp, ArrowBigDown, Share2, Reply, MessageSquare, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import './ForumTopic.css';
import { PageContext } from '../../Contexts/PageContext';

const ForumTopic = () => {
    const [showComments, setShowComments] = useState(false);
    const [showReplyToReply, setShowReplyToReply] = useState(false);
    const [replyText, setReplyText] = useState("");
    const { id } = useParams();

    const [activeReply, setActiveReply] = useState(null); // { commentId, replyId }

    const { forumData, getAllForumData, backendUrl, handleAddReplyUser, userData, handleUpvote, handleDownvote, topic, setTopic } = useContext(PageContext);

    useEffect(() => {
        getAllForumData();
    }, []);

    useEffect(() => {
        if (forumData?.length === 0) return;
        const found = forumData?.find(item => item._id === id);
        setTopic(found);
    }, [id, forumData]);

    const submitNestedReply = async (e) => {
        e.preventDefault();
        if (!replyText.trim() || !activeReply) return;

        const newReply = {
            postId: topic._id,
            commentId: activeReply.commentId,
            replyId: activeReply.replyId,
            content: replyText,
            author: userData.userData?.name
        };

        await handleAddReplyUser(newReply);
        setReplyText("");
        setActiveReply(null);
        setTimeout(() => getAllForumData(), 500);
    };

    const submitTopLevelComment = async (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        const newComment = {
            postId: topic._id,
            content: replyText,
            author: userData.userData?.name
        };

        await handleAddReplyUser(newComment);
        setReplyText("");
        setTimeout(() => getAllForumData(), 500);
    };



    if (!topic) return <div className="container" style={{ paddingTop: '150px', textAlign: "center" }}><p>Tópico não encontrado.</p><Link to="/forum">Voltar para o fórum</Link></div>;

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
                            </div>
                        </div>
                    </div>

                    <h1 className="topic-title text-gradient">{topic.title}</h1>

                    <div className="topic-body">
                        {topic.imageUrl && topic.imageUrl !== "default.jpg" ? (
                            <div className="topic-image">
                                <img src={`${backendUrl}/uploads/${topic.imageUrl}`} alt="Topic" />
                            </div>
                        ) : (
                            <div className='topic-image'></div>
                        )}
                    </div>
                    <p>{topic.content}</p>

                    <div className="topic-tags">
                        {topic.tags.map(tag => (
                            <span key={tag} className="tag">#{tag}</span>
                        ))}
                    </div>

                    <div className="topic-actions">
                        <div className="vote-group">
                            <button className="icon-btn" onClick={handleUpvote}><ArrowBigUp size={24} color="green" /></button>
                            <span className="vote-count">{topic.upvotes - topic.downvotes}</span>
                            <button className="icon-btn" onClick={handleDownvote}><ArrowBigDown size={24} color="red" /></button>
                        </div>

                        <div className="action-group">
                            <button className="icon-btn"><MessageSquare size={20} /> {topic.comments.length}</button>
                            <button className="icon-btn"><Share2 size={20} /> Compartilhar</button>
                        </div>
                    </div>
                </div>

                <div className="comments-section">
                    <h3>Respostas ({topic.comments?.length})</h3>

                    <div className="comments-list">
                        {topic.comments?.map((comment, index) => (
                            <motion.div
                                key={comment._id + index}
                                className="comment-card glass"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {/* ===== COMMENT ===== */}
                                <div className="author-info comment-author">
                                    <div className="author-avatar small-avatar">
                                        {comment.author?.charAt(0)}
                                    </div>
                                    <span className="author-name">{comment.author}</span>
                                    {comment.isAdmin && (
                                        <span className="admin-badge">
                                            <ShieldCheck /> Admin
                                        </span>
                                    )}
                                </div>

                                <div className="comment-body">
                                    <p>{comment.content}</p>
                                </div>

                                <div className="comment-actions">

                                    <button
                                        className="icon-btn small-btn"
                                        onClick={() =>
                                            setActiveReply(
                                                activeReply?.commentId === comment._id && activeReply?.replyId === null
                                                    ? null
                                                    : { commentId: comment._id, replyId: null }
                                            )
                                        }
                                    >
                                        <Reply size={16} /> Responder <span>{comment.replies?.length > 0 ? `(${comment.replies?.length})` : ""}</span>

                                    </button>
                                    {comment?.replies?.length > 0 && (
                                        <span className="view-replies" onClick={() => setShowComments(prev => prev === comment._id ? false : comment._id)} style={{ cursor: "pointer", marginLeft: "10px" }}>
                                            {showComments === comment._id ? <Eye size={16} /> : <EyeOff size={16} />}
                                        </span>
                                    )}
                                </div>

                                {/* ===== INPUT REPLY TO COMMENT ===== */}
                                {activeReply?.commentId === comment._id && activeReply?.replyId === null && (
                                    <form className="reply-form glass"
                                        id="reply-form-nested"
                                        onSubmit={submitNestedReply}>
                                        <h4>Responder comentário</h4>
                                        <textarea
                                            rows={3}
                                            placeholder="Escreva sua resposta..."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                        />
                                        <div className="reply-form-footer">
                                            <button type="button" className="btn-secondary" style={{ marginRight: "10px", background: "transparent", border: "1px solid #555", color: "#fff", padding: "8px 15px", borderRadius: "8px", cursor: "pointer" }} onClick={() => setActiveReply(null)}>Cancelar</button>
                                            <button type="submit" className="btn-primary">Enviar</button>
                                        </div>
                                    </form>
                                )}

                                {/* ===== REPLIES ===== */}
                                {showComments === comment._id && comment.replies?.map((reply, i) => (
                                    <div key={reply._id}>
                                        <motion.div
                                            className="comment-card glass reply"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            style={{ marginLeft: "30px", marginTop: "15px" }}
                                        >
                                            <div className="author-info comment-author">
                                                <div className="author-avatar small-avatar">
                                                    {reply.author?.charAt(0)}
                                                </div>
                                                <span className="author-name">{reply.author}</span>

                                                {reply.isAdmin && (
                                                    <span className="admin-badge">
                                                        <ShieldCheck /> Admin
                                                    </span>
                                                )}
                                            </div>

                                            <div className="comment-body">
                                                <p>{reply.content}</p>
                                            </div>

                                            <div className="comment-actions">
                                                <button className="icon-btn small-btn">
                                                    <ArrowBigUp size={18} /> 0
                                                </button>
                                                <button
                                                    className="icon-btn small-btn"
                                                    onClick={() =>
                                                        setActiveReply(
                                                            activeReply?.replyId === reply._id
                                                                ? null
                                                                : { commentId: comment._id, replyId: reply._id }
                                                        )
                                                    }
                                                >
                                                    <Reply size={16} /> Responder <span>{reply?.replyReply?.length > 0 ? `(${reply?.replyReply?.length})` : ""}</span>
                                                </button>
                                                {reply?.replyReply?.length > 0 && (
                                                    <span className="view-replies" onClick={() => setShowReplyToReply(prev => prev === reply._id ? false : reply._id)} style={{ cursor: "pointer", marginLeft: "10px" }}>
                                                        {showReplyToReply === reply._id ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </span>
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* ===== INPUT REPLY TO REPLY ===== */}
                                        {activeReply?.replyId === reply._id && (
                                            <form
                                                className="reply-form glass"
                                                style={{
                                                    marginLeft: "30px",
                                                    marginTop: "15px"
                                                }}
                                                onSubmit={submitNestedReply}>
                                                <h4>Responder à {reply.author}</h4>
                                                <textarea
                                                    rows={3}
                                                    placeholder="Escreva sua resposta..."
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                />
                                                <div className="reply-form-footer">
                                                    <button type="button" className="btn-secondary" style={{ marginRight: "10px", background: "transparent", border: "1px solid #555", color: "#fff", padding: "8px 15px", borderRadius: "8px", cursor: "pointer" }} onClick={() => setActiveReply(null)}>Cancelar</button>
                                                    <button type="submit" className="btn-primary">Enviar</button>
                                                </div>
                                            </form>
                                        )}

                                        {/* ===== REPLY OF REPLIES (Nível 3) ===== */}
                                        {showReplyToReply === reply._id && reply?.replyReply?.map((rr, j) => (
                                            <motion.div
                                                key={rr._id}
                                                className="comment-card glass reply"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                style={{ marginLeft: "10%", marginTop: "10px", borderLeft: "2px solid rgba(157, 78, 221, 0.3)" }}
                                            >
                                                <div className="author-info comment-author">
                                                    <div className="author-avatar small-avatar" style={{ width: '24px', height: '24px', fontSize: '0.8rem' }}>
                                                        {rr.author?.charAt(0)}
                                                    </div>
                                                    <span className="author-name" style={{ fontSize: '0.85rem' }}>{rr.author}</span>
                                                </div>
                                                <div className="comment-body" style={{ fontSize: '0.9rem', marginTop: '5px' }}>
                                                    <p>{rr.content}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ))}
                            </motion.div>
                        ))}
                    </div>

                    <form className="reply-form glass" onSubmit={submitTopLevelComment}>
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
        </motion.section >
    );
};

export default ForumTopic;
