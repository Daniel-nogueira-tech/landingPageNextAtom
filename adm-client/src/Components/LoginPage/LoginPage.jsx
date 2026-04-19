import React from 'react';
import './LoginPage.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ContextApp } from '../../Context/ContextApp';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(ContextApp);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const success = await login(email, password);
        if (success) {
            navigate('/dashboard');
        } else {
            setError('Email ou senha incorretos');
        }
    };


    return (
        <div className="login-page">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="login-container"
            >
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Entrar</button>
                </form>
                <p>Esqueceu sua senha? <Link to="/forgot-password">Recuperar senha</Link></p>
            </motion.div>
        </div>
    );
};

export default LoginPage;