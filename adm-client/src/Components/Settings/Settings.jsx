import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Settings.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Send, Shield, CheckCircle } from 'lucide-react';

const initialTeam = [
    { id: 1, email: 'suporte@crypto.io', date: '10/04/2026' },
    { id: 2, email: 'moderador@crypto.io', date: '12/04/2026' }
];

const Settings = () => {
    const [team, setTeam] = useState(initialTeam);
    const [inviteEmail, setInviteEmail] = useState('');
    const [toastMsg, setToastMsg] = useState(null);

    // Basic Validation: must include @ and .com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    // Additional validation check per instructions
    const includesRequiredChars = inviteEmail.includes('@') && inviteEmail.includes('.com');
    const isValid = emailRegex.test(inviteEmail) && includesRequiredChars;

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 3000);
    };

    const handleInvite = (e) => {
        e.preventDefault();
        if (isValid) {
            const newMember = {
                id: Date.now(),
                email: inviteEmail,
                date: new Date().toLocaleDateString('pt-BR')
            };
            setTeam([newMember, ...team]);
            setInviteEmail('');
            showToast("Convite enviado com sucesso!");
        }
    };

    const handleRemove = (id) => {
        setTeam(team.filter(member => member.id !== id));
        showToast("Acesso removido com sucesso!");
    };

    return (
        <div className="admin-dashboard-container">
            <Sidebar />
            <main className="admin-main-content" id="admin-config" >
                <header className="main-header mb-0" style={{ textAlign: 'center', justifyContent: 'center' }}>
                    <div>
                        <h1><span className="text-gradient">Configurações</span></h1>
                        <p className="text-muted" style={{ marginTop: '0.5rem' }}>
                            Gerencie quem tem permissão para acessar o dashboard e editar conteúdos do site.
                        </p>
                    </div>
                </header>

                <section className="settings-section glass-panel">
                    <div className="settings-section-header">
                        <Shield className="settings-icon" size={24} />
                        <h2>Gestão de Equipe</h2>
                    </div>

                    <form className="invite-form" onSubmit={handleInvite}>
                        <div className="invite-input-group">
                            <input
                                type="email"
                                placeholder="Adicionar E-mail Autorizado (ex: nome@dominio.com)"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                            />
                            <button
                                type="submit"
                                className={`invite-btn purple-gradient ${!isValid && inviteEmail.length > 0 ? 'disabled' : ''} ${inviteEmail.length === 0 ? 'disabled' : ''}`}
                                disabled={!isValid}
                            >
                                <Send size={18} /> Convidar
                            </button>
                        </div>
                    </form>

                    <div className="team-list">
                        <AnimatePresence>
                            {team.map((member) => (
                                <motion.div
                                    className="team-member-card"
                                    key={member.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    layout
                                >
                                    <div className="member-info">
                                        <h4>{member.email}</h4>
                                        <span>Autorizado em: {member.date}</span>
                                    </div>
                                    <button
                                        className="btn-icon btn-delete"
                                        onClick={() => handleRemove(member.id)}
                                        title="Remover Acesso"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {team.length === 0 && (
                            <p className="no-members-msg">Nenhum colaborador autorizado no momento.</p>
                        )}
                    </div>
                </section>

                {/* Framer Motion Toast */}
                <AnimatePresence>
                    {toastMsg && (
                        <motion.div
                            className="custom-toast glass-panel"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        >
                            <CheckCircle size={20} className="toast-icon" />
                            <span>{toastMsg}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Settings;