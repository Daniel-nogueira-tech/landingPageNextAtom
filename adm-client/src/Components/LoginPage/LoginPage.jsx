import React from 'react';
import './LoginPage.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ContextApp } from '../../Context/ContextApp';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const navigate = useNavigate();
    const { Url } = useContext(ContextApp);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Login
    const login = async (email, password, e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            return;
        }
        const payload = {
            email: email,
            password: password
        };
        navigate('/dashboard');
        console.log(payload);
        try {
            const response = await axios.post(`${Url}/api/userAdmin/login`, payload);
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
            }
            toast.success(response.data.message);
            getAllUsersToAdmin();
        } catch (error) {
            toast.error(error.response.data.message);
            setError(error.response.data.message);
            console.error('Error fetching all users:', error);
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
                <form onSubmit={login}>
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