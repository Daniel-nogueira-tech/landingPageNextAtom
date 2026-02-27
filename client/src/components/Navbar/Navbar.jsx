import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Menu, X, Atom, UserRound, LogOut, Mail, Check, OctagonAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageContext } from '../../Contexts/PageContext';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { setIsLoginPopupOpen, userData, backendUrl, setIsLogin, setUserData } = React.useContext(PageContext);
    const toast = useRef(null);
    const navigate = useNavigate();

    console.log("isAccountVerified :", userData?.userData?.isAccountVerified);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const sendVerificationOtp = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
            if (data.success) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: data.message,
                    life: 5000
                });
                setTimeout(() => {
                    navigate('/email-verify');
                }, 3000);
            }

        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response.data.message,
                life: 5000
            });
        }
    }

    const logout = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
            data.success && setIsLogin(false);
            data.success && setUserData(false);
            toast.current.show({ severity: 'Contrast', summary: 'Logout', detail: data.message });

        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.message });
        }
    }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
            <Toast ref={toast} position="top-left" />
            <div className="container nav-content">
                <div className="logo">
                    <Atom className="logo-icon" size={28} />
                    <span>Next<span className="text-gradient">Atom</span></span>
                </div>

                <div className="desktop-menu">
                    <ul className="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#learn">Aprender</a></li>
                        <li><a href="#download">Download</a></li>
                        <li><a href="#news">Notícias</a></li>
                    </ul>

                    {userData ? (
                        <div className='user-profile-container'>
                            <span className='check-email'>{userData?.userData?.isAccountVerified ? <Check /> : <OctagonAlert className='alert-verify-email' />}</span>
                            <div className="btn-primary" id='user-profile' >

                                <span> <UserRound size={28} /> <p>{userData?.userData?.name || ""}</p></span>
                                {/**Menu dropdown */}
                                <ul className='user-profile-dropdown'>
                                    <li><UserRound size={28} />Perfil</li>
                                    <li onClick={logout}><LogOut size={28} />Sair</li>
                                    {userData?.userData?.isAccountVerified
                                        ? null
                                        : <li className='text-danger' onClick={sendVerificationOtp}
                                        ><OctagonAlert size={38} />
                                            Verificar email</li>}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <button className="btn-primary" onClick={() => setIsLoginPopupOpen(true)}>Entrar</button>
                    )}
                </div>

                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-menu glass"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <ul className="mobile-nav-links">
                            <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
                            <li><a href="#learn" onClick={() => setIsOpen(false)}>Aprender</a></li>
                            <li><a href="#download" onClick={() => setIsOpen(false)}>Download</a></li>
                            <li><a href="#news" onClick={() => setIsOpen(false)}>Notícias</a></li>
                            <li>
                                {userData ? (
                                    <>
                                        <span className='check-email'>{userData?.userData?.isAccountVerified ? <Check /> : null}</span>
                                        <div className="btn-primary" id='user-profile' >

                                            <span> <UserRound size={28} /> <p>{userData?.userData?.name || ""}</p></span>
                                            {/**Menu dropdown */}
                                            <ul className='user-profile-dropdown'>
                                                <li><UserRound size={28} />Perfil</li>
                                                <li onClick={logout}><LogOut size={28} />Sair</li>
                                                {userData?.userData?.isAccountVerified
                                                    ? null
                                                    : <li className='text-danger' onClick={sendVerificationOtp}
                                                    ><OctagonAlert size={38} />
                                                        Verificar email</li>}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <button className="btn-primary" onClick={() => setIsLoginPopupOpen(true)}>Entrar</button>
                                )}
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
