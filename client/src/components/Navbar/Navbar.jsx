import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Menu, X, UserRound, LogOut, Check, OctagonAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageContext } from '../../Contexts/PageContext';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useNavigate, Link } from 'react-router-dom';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { setIsLoginPopupOpen, userData, backendUrl, setIsLogin, setUserData } = React.useContext(PageContext);
    const toast = useRef(null);
    const navigate = useNavigate();


    function getLastTwoNames(fullName) {
        if (!fullName || typeof fullName !== "string") return "";

        const parts = fullName.trim().split(/\s+/);

        if (parts.length <= 2) {
            return parts.join(" ");
        }
        return parts.slice(2).join(" ");
    }
    const lastTwoNames = getLastTwoNames(userData?.userData?.name)


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
                <Link to="/">
                    <div className="logo">
                        <img src="/favicon.ico" alt="" style={{ width: '40px', height: '40px' }} />
                        <span>Next<span className="text-gradient">Atom</span></span>
                    </div>
                </Link>

                <div className="desktop-menu">
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><a href="#learn">Aprender</a></li>
                        <li><a href="#download">Download</a></li>
                        <li><a href="#news">Notícias</a></li>
                        <li><Link to="/forum">Comunidade</Link></li>
                        <li><Link to="/planos">Planos</Link></li>
                    </ul>

                    {userData ? (
                        <div className='user-profile-container'>
                            <div className="btn-primary" id='user-profile' >
                                <span className='check-email'>{userData?.userData?.isAccountVerified ? <Check /> : <OctagonAlert className='alert-verify-email' />}</span>
                                <span> <UserRound size={28} /></span>
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
                            <p>{lastTwoNames || ""}</p>
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
                            <li><Link to="/forum" onClick={() => setIsOpen(false)}>Fórum</Link></li>
                            <li><Link to="/planos" onClick={() => setIsOpen(false)}>Planos</Link></li>

                            <li>
                                {userData ? (
                                    <>
                                        <div className="btn-primary" id='user-profile' >
                                            <span> <UserRound size={28} /> </span>

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
                                            <p>{userData?.userData?.name || ""}</p>
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
