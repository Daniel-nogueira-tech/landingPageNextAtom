import React from 'react';
import './Footer.css';
import { Rocket, Twitter, Instagram, Github, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="logo">
                            <Rocket className="logo-icon" size={28} />
                            <span>Next<span className="text-gradient">Atom</span></span>
                        </div>
                        <p>Sua ponte para o futuro financeiro descentralizado. Segurança, velocidade e transparência em um só lugar.</p>
                        <div className="social-links">
                            <a href="#"><Twitter size={20} /></a>
                            <a href="#"><Instagram size={20} /></a>
                            <a href="#"><Github size={20} /></a>
                            <a href="#"><Mail size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="link-group">
                            <h4>Plataforma</h4>
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#learn">Aprender</a></li>
                                <li><a href="#download">Download</a></li>
                                <li><a href="#news">Notícias</a></li>
                            </ul>
                        </div>
                        <div className="link-group">
                            <h4>Suporte</h4>
                            <ul>
                                <li><a href="#">Central de Ajuda</a></li>
                                <li><a href="#">Taxas</a></li>
                                <li><a href="#">Segurança</a></li>
                                <li><a href="#">API</a></li>
                            </ul>
                        </div>
                        <div className="link-group">
                            <h4>Empresa</h4>
                            <ul>
                                <li><a href="#">Sobre Nós</a></li>
                                <li><a href="#">Carreiras</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Termos de Uso</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 NextAtom. Todos os direitos reservados.</p>
                    <div className="bottom-links">
                        <a href="#">Política de Privacidade</a>
                        <a href="#">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
