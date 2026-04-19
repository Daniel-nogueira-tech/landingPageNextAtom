import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaHome,
    FaBook,
    FaNewspaper,
    FaCog,
    FaSignOutAlt,
    FaPlus,
    FaComments,
    FaUser,
    FaBars,
    FaTimes
} from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebarMobile = () => {
        if (isMobile) setIsOpen(false);
    };

    const sidebarContent = (
        <>
            <div className="sidebar-brand">
                {isMobile && (
                    <button className="close-sidebar-btn" onClick={closeSidebarMobile}>
                        <FaTimes />
                    </button>
                )}
                <img src="/favicon.ico" alt="Logo" width={50} height={50} style={{ borderRadius: '50%' }} />
                <h2>Admin<span>Panel</span></h2>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    <Link to="/" style={{ textDecoration: 'none' }} className={isActive('/')} onClick={closeSidebarMobile}>
                        <li className="nav-item">
                            <FaHome className="nav-icon" /> Dashboard
                        </li>
                    </Link>
                    <Link to="/learning-content" style={{ textDecoration: 'none' }} className={isActive('/learning-content')} onClick={closeSidebarMobile}>
                        <li className="nav-item">
                            <FaBook className="nav-icon" /> Conteúdo de Aprendizado
                        </li>
                    </Link>
                    <Link to="/manage-news" style={{ textDecoration: 'none' }} className={isActive('/manage-news')} onClick={closeSidebarMobile}>
                        <li className="nav-item">
                            <FaNewspaper className="nav-icon" /> Gerenciar Notícias
                        </li>
                    </Link>
                    <Link to="/manage-forum" style={{ textDecoration: 'none' }} className={isActive('/manage-forum')} onClick={closeSidebarMobile}>
                        <li className="nav-item">
                            <FaComments className="nav-icon" /> Gerenciar Fóruns
                        </li>
                    </Link>
                    <Link to="/manage-users" style={{ textDecoration: 'none' }} className={isActive('/manage-users')} onClick={closeSidebarMobile}>
                        <li className="nav-item">
                            <FaUser className="nav-icon" /> Gerenciar Usuários
                        </li>
                    </Link>
                </ul>
            </nav>

            <div className="sidebar-actions">
                <Link to="/learning-add" style={{ textDecoration: 'none', width: '100%' }} onClick={closeSidebarMobile}>
                    <button className="action-btn purple-gradient" style={{ textDecoration: 'none', width: '100%' }}>
                        <FaPlus /> Adicionar Novo Curso
                    </button>
                </Link>
                <Link to="/news-add" style={{ textDecoration: 'none', width: '100%' }} onClick={closeSidebarMobile}>
                    <button className="action-btn purple-gradient" style={{ textDecoration: 'none', width: '100%' }}>
                        <FaPlus /> Publicar Nova Notícia
                    </button>
                </Link>
            </div>

            <div className="sidebar-footer">
                <div className="nav-item">
                    <FaCog className="nav-icon" /> Configurações
                </div>
                <div className="nav-item text-danger" onClick={closeSidebarMobile}>
                    <FaSignOutAlt className="nav-icon" /> Sair
                </div>
            </div>
        </>
    );

    return (
        <>
            {/* Hamburger Button on Mobile */}
            {isMobile && (
                <button className={`mobile-hamburger-btn glass-panel ${isOpen ? 'hidden' : ''}`} onClick={toggleSidebar}>
                    <FaBars />
                </button>
            )}

            {/* Overlay for Mobile Darkening */}
            <AnimatePresence>
                {isMobile && isOpen && (
                    <motion.div
                        className="sidebar-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={closeSidebarMobile}
                    />
                )}
            </AnimatePresence>

            {/* Conditional Rendering of Desktop vs Mobile Sidebar */}
            {!isMobile ? (
                <aside className="admin-sidebar glass-panel">
                    {sidebarContent}
                </aside>
            ) : (
                <AnimatePresence>
                    {isOpen && (
                        <motion.aside
                            className="admin-sidebar mobile-sidebar"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                        >
                            {sidebarContent}
                        </motion.aside>
                    )}
                </AnimatePresence>
            )}
        </>
    );
}

export default Sidebar;