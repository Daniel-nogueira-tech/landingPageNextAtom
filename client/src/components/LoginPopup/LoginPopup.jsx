
import React, { useState } from 'react';
import './LoginPopup.css';
import { PageContext } from '../../Contexts/PageContext';
import { User, X } from 'lucide-react'
import { Password } from 'primereact/password';
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { Messages } from 'primereact/messages';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Toast } from 'primereact/toast';








const LoginPopup = () => {
    const { setIsLoginPopupOpen, backendUrl, setIsLoading, getUserData, setIsLogin } = React.useContext(PageContext);
    const messages = useRef(null);


    const [valueConfirm, setValueConfirm] = useState('');
    const [currernState, setCurrenState] = useState("Login")
    const [value, setValue] = useState({
        name: "",
        email: "",
        password: ""
    });

    const toast = useRef(null);





    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValue(prev => ({ ...prev, [name]: value }));
    }

    const onSubmitLogin = async (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;

        if (currernState === "Sing up" && value.password !== valueConfirm) {
            messages.current.show({
                severity: 'warn',
                summary: '',
                detail: 'Passwords do not match',
                life: 4000
            });
            return;
        }
        try {
            const response = await axios.post(
                `${backendUrl}/api/auth/${currernState === "Sing up" ? "register" : "login"}`,
                {
                    name: value.name,
                    email: value.email,
                    password: value.password
                }
            );

            const data = response.data;


            if (data.success) {
                toast.current.show({
                    severity: 'success',
                    summary: 'success',
                    detail: data.message || 'Operação realizada com sucesso!',
                    life: 3000
                });
            };

            setIsLogin(true);
            getUserData();
            setTimeout(() => {
                setIsLoginPopupOpen(false);
            }, 1000);

        } catch (error) {
            if (error.response) {
                // Erro vindo do backend (400, 401, 500...)
                const status = error.response.status;
                const message = error.response.data?.message;

                if (status === 400) {
                    toast.current.show({
                        severity: 'warn',
                        summary: 'Warn',
                        detail: message || 'Dados inválidos.',
                        life: 4000
                    });

                } else {
                    toast.current.show({
                        severity: 'error',
                        summary: 'error',
                        detail: message || 'Erro no servidor.',
                        life: 4000
                    });
                }

            } else {
                // Erro de rede (backend offline, CORS, etc.)
                toast.current.show({
                    severity: 'error',
                    summary: 'Erro de conexão',
                    detail: 'Não foi possível conectar ao servidor.',
                    life: 4000
                });
            }
        }
    }

    return (
        <div className='login-popup'>
            <Toast ref={toast} position="top-left" />
            <form onSubmit={onSubmitLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>
                        {currernState}
                    </h2>
                    <button type="button" onClick={() => setIsLoginPopupOpen(false)} >  <X />  </button>
                </div>
                <div className="login-popup-inputs">
                    {currernState === "Login" && (
                        <>
                            <input
                                type="text"
                                placeholder='Email'
                                name='email'
                                onChange={onChangeHandler}
                                value={value.email}
                                required />

                            <Password
                                onChange={onChangeHandler}
                                name='password'
                                value={value.password}
                                promptLabel="Digite uma senha"
                                weakLabel="Fraca"
                                mediumLabel="Média"
                                strongLabel="Forte"
                                placeholder='Password'
                                toggleMask
                            />
                        </>
                    )}
                    {currernState === "Sing up" && (
                        <>
                            <input
                                type="text"
                                placeholder='Username'
                                name='name'
                                onChange={onChangeHandler}
                                value={value.name}
                                required />
                            <input
                                type="text"
                                placeholder='Email'
                                name='email'
                                onChange={onChangeHandler}
                                value={value.email}
                                required />
                            <Password
                                value={value.password}
                                onChange={onChangeHandler}
                                name='password'
                                promptLabel="Digite uma senha"
                                weakLabel="Fraca"
                                mediumLabel="Média"
                                strongLabel="Forte"
                                placeholder='Password'
                                toggleMask
                            />
                            <Password
                                value={valueConfirm}
                                onChange={(e) => setValueConfirm(e.target.value)}
                                name='confirmPassword'
                                promptLabel="Digite uma senha"
                                weakLabel="Fraca"
                                mediumLabel="Média"
                                strongLabel="Forte"
                                placeholder='ConfirmPassword'
                                toggleMask
                            />
                            <Messages ref={messages} />
                        </>

                    )}
                </div>
                <button
                    className='btn-primary btn-login'
                    type="submit">{currernState === "Sing up" ? "Create account" : "Login"}
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>Concorda com os termos e condições?</p>
                </div>
                <div className='login-popup-texts'>
                    {currernState === "Login"
                        ? <p>Não tem uma conta? <span onClick={() => setCurrenState("Sing up")}>Registre-se</span></p>
                        : <p>Já possui uma conta? <span onClick={() => setCurrenState("Login")}>Faça login</span></p>
                    }
                    {currernState === "Login" && <p className='text-ResetPassword'>Esqueceu sua senha?
                        <Link to="/reset-password">
                            <span>Click aqui</span>
                        </Link>
                    </p>}
                </div>
            </form>


        </div>
    );
};

export default LoginPopup;