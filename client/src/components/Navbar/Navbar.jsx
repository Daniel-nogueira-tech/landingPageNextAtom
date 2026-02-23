import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Menu, X, Atom, } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageContext } from '../../Contexts/PageContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { setIsLoginPopupOpen } = React.useContext(PageContext);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
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
                    <button className="btn-primary" onClick={() => setIsLoginPopupOpen(true)}>Entrar</button>
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
                                <button className="btn-primary w-full" onClick={() => setIsLoginPopupOpen(true)} >Entrar</button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
