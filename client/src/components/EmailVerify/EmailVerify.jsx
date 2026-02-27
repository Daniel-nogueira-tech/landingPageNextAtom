import React, { useEffect, useRef } from 'react'
import './EmailVerify.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { PageContext } from '../../Contexts/PageContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';







const EmailVerify = () => {
    const { backendUrl, isLogin, userData, getUserData } = useContext(PageContext)
    const toast = useRef(null);
    const inputRefs = React.useRef([])
    const navigate = useNavigate();

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

    const onSubmitOtp = async (e) => {
        e.preventDefault();

        try {
            const otpArray = inputRefs.current.map(input => input.value);
            const otp = otpArray.join('');

            const { data } = await axios.post(
                `${backendUrl}/api/auth/verify-account`,
                { otp }
            );

            console.log(data);

            if (data.success) {
                getUserData();
                toast.current.show({
                    severity: 'Verified',
                    summary: 'Contrast',
                    detail: data.message,
                    life: 5000
                });
            }
            setTimeout(() => {
                navigate('/')
            }, 5000);

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

    useEffect(() => {
        if (isLogin && userData?.userData?.isAccountVerified) {
            navigate('/')
        }
    }, [isLogin, userData]);

    return (
        <div className='email-verify-container' >
            <Toast ref={toast} position="center" />
            <Link to="/">
                <div className='reset-password-container_back'>
                    <span>{'<'}</span>
                    <span className='reset-password-back-text'>Voltar</span>
                </div>
            </Link>
            <form onSubmit={onSubmitOtp}>
                <h4>Verificação de Email</h4>
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
        </div>
    )
}

export default EmailVerify