import React from 'react';
import './LoginPage.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ContextApp } from '../../Context/ContextApp';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Atom } from 'react-loading-indicators';


const LoginPage = () => {
    const navigate = useNavigate();
    const { Url } = useContext(ContextApp);


    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [state, setState] = useState(false);
    const [loading, setLoading] = useState(false);

    // Login
    const login = async (e) => {
        e.preventDefault();
        //setar com true para enviar cookies
        axios.defaults.withCredentials = true;

        setError('');
        if (!data.email || !data.password) {
            return;
        }
        //se state for true, payload vai ter name, email e password
        //se state for false, payload vai ter email e password
        let payload = {};
        if (state) {
            payload = {
                email: data.email,
                password: data.password,
                name: data.name
            };
        } else {
            payload = {
                email: data.email,
                password: data.password
            };
        }

        try {
            let endPoint = state ? "register" : "login";
            const response = await axios.post(`${Url}/api/authAdmin/${endPoint}`, payload);
            setLoading(true);
            if (response.data.success) {
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }

        } catch (error) {
            toast.error(error.response.data.message);
            setError(error.response.data.message);
        }
    };


    return (
        <div className="login-page">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="login-container"
            >
                <div className='logo-login'>
                    <img src="/favicon.ico" alt="Logo" width={40} height={40} style={{ borderRadius: '50%' }} />
                    <h2>Admin<span >{state ? "Registrar" : "Login"}</span></h2>
                </div>

                <form onSubmit={login}>
                    {state && <input
                        autoComplete="new-password"
                        type="text"
                        name="name"
                        placeholder="Nome"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        required
                    />}
                    <input
                        autoComplete="new-password"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        required
                    />
                    <input
                        autoComplete="new-password"
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Entrar</button>
                </form>
                {loading ? <div className='loading-container'><Atom color="#5c0177ff" size={20} /> <p>Carregando...</p></div> :
                    <>
                        <p>Esqueceu sua senha? <Link to="/forgot-password">Recuperar senha</Link></p>
                        <p className='register-link' onClick={() => setState(!state)}>{state ? "Login" : "Registrar"}</p>
                    </>
                }
            </motion.div>
        </div>
    );
};

export default LoginPage;