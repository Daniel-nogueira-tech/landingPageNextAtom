import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ManageUsers.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Edit3, Trash2, X } from 'lucide-react';

const initialUsers = [
    { id: 1, name: 'João Silva', email: 'joao@crypto.com', plan: 'Free' },
    { id: 2, name: 'Admin Supremo', email: 'admin@cripto.io', plan: 'Premium' },
    { id: 3, name: 'Maria Souza', email: 'maria.souza@gmail.com', plan: 'Pro' },
    { id: 4, name: 'Carlos Satoshi', email: 'carlos.nakamoto@web3.com', plan: 'Pro' },
    { id: 5, name: 'Ana Ethereum', email: 'ana.eth@crypto.com', plan: 'Premium' }
];

const ManageUsers = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState(null);

    // Form states
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPlan, setEditPlan] = useState('Free');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
    );

    const handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja remover este usuário?")) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setEditName(user.name);
        setEditEmail(user.email);
        setEditPlan(user.plan);
    };

    const closeEditModal = () => {
        setEditingUser(null);
    };

    const handleSave = (e) => {
        e.preventDefault();
        setUsers(users.map(u =>
            u.id === editingUser.id
                ? { ...u, name: editName, email: editEmail, plan: editPlan }
                : u
        ));
        closeEditModal();
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const rowVariant = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: "tween" } }
    };

    return (
        <div className="admin-dashboard-container">
            <Sidebar />
            <main className="admin-main-content" id="admin-main-content">
                <div className="users-actions-bar">
                    <header className="main-header mb-0">
                        <div>
                            <h1>Gestão de <span className="text-gradient">Usuários</span></h1>
                            <p className="text-muted" style={{ marginTop: '0.5rem' }}>Administre planos e acessos dos clientes da plataforma.</p>
                        </div>
                    </header>


                    <div className="search-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar nome ou e-mail..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Plano</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <motion.tbody
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                        >
                            <AnimatePresence>
                                {filteredUsers.map((user) => (
                                    <motion.tr
                                        key={user.id}
                                        variants={rowVariant}
                                        exit={{ opacity: 0, x: -20 }}
                                        layout
                                    >
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`plan-badge badge-${user.plan.toLowerCase()}`}>
                                                {user.plan}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon btn-edit" title="Editar" onClick={() => openEditModal(user)}>
                                                    <Edit3 size={18} />
                                                </button>
                                                <button className="btn-icon btn-delete" title="Excluir" onClick={() => handleDelete(user.id)}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </motion.tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                        <div className="no-users-found">Nenhum usuário encontrado.</div>
                    )}
                </div>

                {/* Edit Modal */}
                <AnimatePresence>
                    {editingUser && (
                        <div className="modal-overlay">
                            <motion.div
                                className="modal-content glass-panel"
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            >
                                <div className="modal-header">
                                    <h3>Editar Usuário</h3>
                                    <button className="close-btn" onClick={closeEditModal}><X size={24} /></button>
                                </div>
                                <form onSubmit={handleSave} className="modal-body-users">
                                    <div className="form-group">
                                        <label>Nome Completo</label>
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>E-mail</label>
                                        <input
                                            type="email"
                                            value={editEmail}
                                            onChange={(e) => setEditEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Plano</label>
                                        <select value={editPlan} onChange={(e) => setEditPlan(e.target.value)}>
                                            <option value="Free">Free</option>
                                            <option value="Pro">Pro</option>
                                            <option value="Premium">Premium</option>
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn-outline" onClick={closeEditModal}>Cancelar</button>
                                        <button type="submit" className="btn-primary">Salvar Alterações</button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default ManageUsers;