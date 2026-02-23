import React from 'react';
import './Download.css';
import { motion } from 'framer-motion';
import { Apple, PlayCircle, Smartphone } from 'lucide-react';

const Download = () => {
    return (
        <section id="download" className="download">
            <div className="container download-container glass">
                <div className="download-content">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        Leve seu portfólio no <span className="text-gradient">Bolso</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Nosso app mobile permite que você acompanhe o mercado em tempo real, realize trades e gerencie seus ativos de qualquer lugar do mundo.
                    </motion.p>

                    <motion.div
                        className="store-btns"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <button className="store-btn">
                            <Apple size={24} />
                            <div className="btn-text">
                                <span>Download on the</span>
                                <strong>App Store</strong>
                            </div>
                        </button>
                        <button className="store-btn">
                            <PlayCircle size={24} />
                            <div className="btn-text">
                                <span>Get it on</span>
                                <strong>Google Play</strong>
                            </div>
                        </button>
                    </motion.div>
                </div>

                <motion.div
                    className="download-image"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <div className="phone-mockup">
                        <Smartphone strokeWidth={0.5} className="phone-icon" />
                        <div className="phone-screen glass">
                            <div className="screen-header"></div>
                            <div className="screen-content">
                                <div className="chart-line"></div>
                                <div className="chart-line short"></div>
                                <div className="crypto-item"></div>
                                <div className="crypto-item"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="bg-glow-2"></div>
        </section>
    );
};

export default Download;
