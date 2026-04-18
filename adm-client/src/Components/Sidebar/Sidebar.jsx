import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import {
    FaHome,
    FaBook,
    FaNewspaper,
    FaCog,
    FaSignOutAlt,
    FaPlus,
    FaComments
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';


const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'active' : '';


    return (
        <aside className="admin-sidebar glass-panel">
            <div className="sidebar-brand">
                <img src="favicon.ico" alt="Logo" width={50} height={50} style={{ borderRadius: '50%' }} />
                <h2>Admin<span>Panel</span></h2>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    <Link to="/" style={{ textDecoration: 'none' }} className={isActive('/')}>
                        <li className="nav-item">
                            <FaHome className="nav-icon" /> Dashboard
                        </li>
                    </Link>
                    <Link to="/learning-content" style={{ textDecoration: 'none' }} className={isActive('/learning-content')}>
                        <li className="nav-item">
                            <FaBook className="nav-icon" /> Conteúdo de Aprendizado
                        </li>
                    </Link>
                    <Link to="/manage-news" style={{ textDecoration: 'none' }} className={isActive('/manage-news')}>
                        <li className="nav-item">
                            <FaNewspaper className="nav-icon" /> Gerenciar Notícias
                        </li>
                    </Link>
                    <Link to="/manage-forum" style={{ textDecoration: 'none' }} className={isActive('/manage-forum')}>
                        <li className="nav-item">
                            <FaComments className="nav-icon" /> Gerenciar Fóruns
                        </li>
                    </Link>
                </ul>
            </nav>

            <div className="sidebar-actions">
                <Link to="/learning-add" style={{ textDecoration: 'none', width: '100%' }}>
                    <button className="action-btn purple-gradient" style={{ textDecoration: 'none', width: '100%' }}>
                        <FaPlus /> Adicionar Novo Curso/Aula
                    </button>
                </Link>
                <Link to="/news-add" style={{ textDecoration: 'none', width: '100%' }}>
                    <button className="action-btn purple-gradient" style={{ textDecoration: 'none', width: '100%' }}>
                        <FaPlus /> Publicar Nova Notícia
                    </button>
                </Link>
            </div>

            <div className="sidebar-footer">
                <div className="nav-item">
                    <FaCog className="nav-icon" /> Configurações
                </div>
                <div className="nav-item text-danger">
                    <FaSignOutAlt className="nav-icon" /> Sair
                </div>
            </div>
        </aside>
    )
}

export default Sidebar