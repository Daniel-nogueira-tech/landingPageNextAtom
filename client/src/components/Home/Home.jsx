import React from 'react';
import './Home.css';
import { motion } from 'framer-motion';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { PageContext } from '../../Contexts/PageContext';

const Home = () => {
    const { setIsLoginPopupOpen } = React.useContext(PageContext);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="home" className="hero">
            <div className="container hero-content">
                <motion.div
                    className="hero-text"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="badge">
                        <TrendingUp size={16} />
                        <span>A moeda do futuro chegou</span>
                    </motion.div>
                    <motion.h1 variants={itemVariants}>
                        Descentralize seu <span className="text-gradient">Futuro Financeiro</span>
                    </motion.h1>
                    <motion.p variants={itemVariants}>
                        A plataforma mais segura e rápida para comprar, vender e gerenciar seus ativos digitais. Comece hoje mesmo sua jornada no mundo cripto.
                    </motion.p>
                    <motion.div variants={itemVariants} className="hero-btns">
                        <button onClick={() => setIsLoginPopupOpen(true)} className="btn-primary">Criar Conta Grátis</button>
                        <button className="btn-outline">
                            Ver Gráficos <ChevronRight size={18} />
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-image"
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="main-sphere">
                        <div className="inner-sphere">

                            <div className="atom"></div>
                            <div className="orbit orbit-1">
                                <span className="particle"></span>
                            </div>
                            <div className="orbit orbit-2">
                                <span className="particle"></span>
                            </div>
                            <div className="orbit orbit-3">
                                <span className="particle"></span>
                            </div>
                        </div>

                        <div className="floating-card glass card-1">
                            <p>BTC / USDT</p>
                            <h3>$45,230.00</h3>
                            <span className="positive">+2.45%</span>
                        </div>
                        <div className="floating-card glass card-2">
                            <p>Total Balance</p>
                            <h3>$12,750.80</h3>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="bg-glow"></div>
        </section>
    );
};

export default Home;
