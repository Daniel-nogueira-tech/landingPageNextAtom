import React from 'react'
import './ResetPassword.css'
import { Link, useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast';
import { useContext } from 'react'
import { PageContext } from '../../Contexts/PageContext';
import axios from 'axios';
import { Password } from 'primereact/password';


const ResetPassword = () => {
    const { backendUrl, isLogin, userData, getUserData } = useContext(PageContext)
    const toast = React.useRef(null);
    const inputRefs = React.useRef([])
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('')
    const [isEmailSent, setIsEmailSent] = React.useState(false)
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [otp, setOtp] = React.useState(0)
    const [isOtpSubmited, setIsOtpSubmited] = React.useState(false)


    const handleInput = (e, index) => {
        const value = e.target.value
        if (value.length === 1) {
            inputRefs.current[index + 1].focus()
        }
        if (value.length === 0) {
            inputRefs.current[index - 1].focus()
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'ArrowRight') {
            inputRefs.current[index + 1].focus()
        }
        if (e.key === 'ArrowLeft') {
            inputRefs.current[index - 1].focus()
        }
    };

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text')
        const otpArray = pastedData.split('')
        otpArray.forEach((char, index) => {
            inputRefs.current[index].value = char
            inputRefs.current[index].focus()
        })
    };


    const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/auth/send-reset-otp`,
                { email }
            );
            if (data.success) {
                setIsEmailSent(true);
                setTimeout(() => {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: data.message,
                        life: 3000
                    });
                }, 3000);
            }

        } catch (error) {
            console.log(error);
            const message = error.response?.data?.message || "Something went wrong";

            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: message
            });
        }
    };

    const onSubmitOtp = async (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map(input => input.value);
        setOtp(otpArray.join(''));
        setIsOtpSubmited(true)
    };

    const onSubmitPassword = async (e) => {
        e.preventDefault();
        try {
            if (newPassword !== confirmPassword) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Warning',
                    detail: 'Passwords do not match',
                    life: 8000
                });
                return;
            }
            const { data } = await axios.post(
                `${backendUrl}/api/auth/reset-password`,
                { email, otp, newPassword }
            );
            if (data.success) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: data.message,
                    life: 3000
                });
            };
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.log(error);
            const message = error.response?.data?.message || "Something went wrong";
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: message
            });
        }
    };



    return (
        <>
            {/* Email Verify */}
            <div className='reset-password-container' >
                <Toast ref={toast} position="top-left" />
                <Link to="/">
                    <div className='reset-password-container_back'>
                        <span>{'<'}</span>
                        <span className='reset-password-back-text'>Voltar</span>
                    </div>
                </Link>
                <form onSubmit={onSubmitEmail}>
                    <input
                        type="email"
                        placeholder='✉ Email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit">Recuperar Senha</button>
                </form>

                {/* OTP Verify */}
                {isEmailSent && !isOtpSubmited && <div className='email-verify-container' >
                    <Link to="/">
                        <div className='reset-password-container_back'>
                            <span>{'<'}</span>
                            <span className='reset-password-back-text'>Voltar</span>
                        </div>
                    </Link>
                    <form onSubmit={onSubmitOtp}>
                        <h4>Verificação OTP</h4>
                        <p>Digite o código de verificação enviado para o seu email</p>
                        <div className='input-otp-container' onPaste={handlePaste}>
                            {Array(6).fill(0).map((_, index) => (
                                <input key={index} type="text" maxLength='1' required
                                    ref={e => inputRefs.current[index] = e}
                                    onInput={(e) => handleInput(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)} />
                            ))}
                        </div>
                        <button type='submit'>Verificar email</button>
                    </form>
                </div>}

                {/* New Password */}
                {isOtpSubmited && isEmailSent &&
                    <div className='reset-password-container'>
                        <Link to="/">
                            <div className='reset-password-container_back'>
                                <span>{'<'}</span>
                                <span className='reset-password-back-text'>Voltar</span>
                            </div>
                        </Link>
                        <form onSubmit={onSubmitPassword}>
                            <Password
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                name='password'
                                promptLabel="Digite uma senha"
                                weakLabel="Fraca"
                                mediumLabel="Média"
                                strongLabel="Forte"
                                placeholder='🔒 Password'
                                toggleMask />
                            <Password
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                name='password'
                                promptLabel="Digite uma senha"
                                weakLabel="Fraca"
                                mediumLabel="Média"
                                strongLabel="Forte"
                                placeholder='🔐 Confirmar Password'
                                toggleMask />
                            <button type="submit">Recuperar Senha</button>
                        </form>
                    </div>
                }




            </div >
        </>
    )
};

export default ResetPassword