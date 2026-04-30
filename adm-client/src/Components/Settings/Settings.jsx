import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Settings.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Send, Shield, CheckCircle, ShieldCheck } from 'lucide-react';
import { ContextApp } from '../../Context/ContextApp';
import axios from 'axios';

const Settings = () => {
    const { sendVerificationOtpAdmin, user, Url, invitations, getInvitations, removeInvitation, toastMsg, showToast } = useContext(ContextApp);


    const [team, setTeam] = useState(invitations);
    const [inviteEmail, setInviteEmail] = useState('');

    // Basic Validation: must include @ and .com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    // Additional validation check per instructions
    const includesRequiredChars = inviteEmail.includes('@') && inviteEmail.includes('.com');
    const isValid = emailRegex.test(inviteEmail) && includesRequiredChars;


    const handleInvite = async (e) => {
        e.preventDefault();
        if (isValid) {
            try {
                const response = await axios.post(`${Url}/api/inviteAdmin/invite-admin`, { email: inviteEmail });
                if (response.data.success) {
                    setInviteEmail('');
                    showToast(response.data.message);
                }
                getInvitations();
            } catch (error) {
                showToast(error.response.data.message);
            }
        } else {
            showToast("Email inválido!");
        }
    };


    useEffect(() => {
        getInvitations();
    }, []);



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
                    <div className="settings-section-header" >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <Shield className="settings-icon" size={24} />
                            <h2>Gestão de Equipe</h2>
                        </div>
                        {!user?.isAccountVerified ? (
                            <div className="settings-section-header-right">
                                Verificação de email
                                <button onClick={sendVerificationOtpAdmin}>Verificar</button>
                            </div>
                        ) : (
                            <div className="settings-section-header-right">
                                <ShieldCheck size={20} color="#fffb07ff" /> Conta verificada
                            </div>
                        )}
                    </div>



                    {<form className="invite-form" onSubmit={handleInvite}>
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
                    </form>}

                    <div className="team-list">
                        <AnimatePresence>
                            {invitations?.map((member) => (
                                <motion.div
                                    className="team-member-card"
                                    key={member._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    layout
                                >
                                    <div className="member-info">
                                        <h4>{member.email}</h4>
                                        <span>Autorizado em: {member.createdAt}</span>
                                    </div>
                                    <button
                                        className="btn-icon btn-delete"
                                        onClick={() => removeInvitation(member._id)}
                                        title="Remover Acesso"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {invitations?.length === 0 && (
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