import React from 'react';
import './Learn.css';
import { motion } from 'framer-motion';
import { BookOpen, ShieldCheck, Zap, Globe } from 'lucide-react';

const Learn = () => {
    const cards = [
        {
            icon: <BookOpen size={40} />,
            title: "O que é Blockchain?",
            desc: "Entenda a tecnologia por trás das criptomoedas e como ela garante segurança descentralizada."
        },
        {
            icon: <Zap size={40} />,
            title: "Como fazer Trade",
            desc: "Aprenda as melhores estratégias para comprar e vender ativos com lucro e baixo risco."
        },
        {
            icon: <ShieldCheck size={40} />,
            title: "Segurança de Carteira",
            desc: "Proteja seus ativos com as melhores práticas de custódia e chaves privadas."
        },
        {
            icon: <Globe size={40} />,
            title: "Ecossistema DeFi",
            desc: "Explore o mundo das finanças descentralizadas e como obter rendimentos passivos."
        }

    ];

    return (
        <section id="learn" className="learn">
            <div className="container">
                <div className="section-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Aprenda com <span className="text-gradient">Especialistas</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Temos todo o conteúdo que você precisa para sair do zero e se tornar um mestre em criptoativos.
                    </motion.p>
                </div>

                <motion.div
                    className="learn-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.2 } }
                    }}
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="learn-card glass"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                            whileHover={{ y: -10, borderColor: "var(--primary)" }}
                        >
                            <div className="card-icon">{card.icon}</div>
                            <h3>{card.title}</h3>
                            <p>{card.desc}</p>
                            <a href="#" className="card-link">Saber mais →</a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Learn;
