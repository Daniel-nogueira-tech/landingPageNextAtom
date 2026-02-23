
import React, { useState } from 'react';
import './LoginPopup.css';
import { PageContext } from '../../Contexts/PageContext';
import { User, X } from 'lucide-react'
import { Password } from 'primereact/password';
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';

import { Messages } from 'primereact/messages';
import { useRef } from 'react';










const LoginPopup = () => {
    const { setIsLoginPopupOpen } = React.useContext(PageContext);

    const messages = useRef(null);

    const [valueConfirm, setValueConfirm] = useState('');
    const [currernState, setCurrenState] = useState("Login")
    const [value, setValue] = useState({
        name: "",
        email: "",
        password: ""
    });

    console.log(value);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValue(prev => ({ ...prev, [name]: value }));
    }

    const onSubmitLogin = async (event) => {
        event.preventDefault();
        if (currernState === "Sing up" && value.password !== valueConfirm) {
            messages.current.show({
                severity: 'warn',
                summary: '',
                detail: 'Passwords do not match',
                life: 4000
            });
            return;
        }
        window.location.reload();
    }

    return (
        <div className='login-popup'>

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
                {currernState === "Login"
                    ? <p>Não tem uma conta? <span onClick={() => setCurrenState("Sing up")}>Registre-se</span></p>
                    : <p>Já possui uma conta? <span onClick={() => setCurrenState("Login")}>Faça login</span></p>
                }
            </form>


        </div>
    );
};

export default LoginPopup;