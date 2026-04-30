import React, { useState, useRef, useContext } from 'react';
import './ResetPassword.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ContextApp } from '../../Context/ContextApp';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { Url } = useContext(ContextApp);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [otp, setOtp] = useState(0);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const handleInput = (e, index) => {
        const value = e.target.value;
        if (value.length === 1) {
            inputRefs.current[index + 1].focus();
        }
        if (value.length === 0) {
            inputRefs.current[index - 1].focus();
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
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const otpArray = pastedData.split('');
        otpArray.forEach((char, index) => {
            inputRefs.current[index].value = char;
            inputRefs.current[index].focus();
        });
    };

    // subimit email
    const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${Url}/api/authAdmin/send-reset-otp`,
                { email }
            );
            if (data.success) {
                setIsEmailSent(true);
                setTimeout(() => {
                    toast.success(data.message);
                }, 3000);
            }

        } catch (error) {
            console.log(error);
            const message = error.response?.data?.message || "Something went wrong";
            toast.error(message);
        }
    };

    // submit otp
    const onSubmitOtp = async (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map(input => input.value);
        setOtp(otpArray.join(''));
        setIsOtpVerified(true);
    };

    // submit new password
    const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        try {
            if (newPassword !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            const { data } = await axios.post(
                `${Url}/api/authAdmin/reset-password`,
                { email, otp, newPassword }
            );
            if (data.success) {
                toast.success(data.message);
            }
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (error) {
            console.log(error);
            const message = error.response?.data?.message || "Something went wrong";
            toast.error(message);
        }
    };


    return (
        <>
            <div className='reset-password-container'>
                <div className='reset-password-card'>
                    <div className='reset-password-header'>
                        <img src="favicon.ico" alt="" className='reset-password-logo' width={50} height={50} />
                        <h1>Resetar <span className='text-gradient'>senha</span></h1>
                    </div>
                    {!isEmailSent && !isOtpVerified &&
                        <>
                            <form className='reset-password-form' onSubmit={onSubmitEmail}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    required />
                                <button type="submit">Resetar senha</button>
                            </form>
                            <p>Voltar para o login <Link to="/login">Login</Link></p>
                        </>
                    }

                    {/*Otp verification */}
                    {isEmailSent && !isOtpVerified &&
                        <div>
                            <form onSubmit={onSubmitOtp}>
                                <Link to="/">
                                    <div className='back-btn'>
                                        <span>{'<'}</span>
                                    </div>
                                </Link>
                                <div className='reset-password-form'>
                                    <h4>Verificação OTP</h4>
                                    <p>Digite o código enviado para o seu email</p>
                                    <div className='input-otp-container' onPaste={handlePaste}>
                                        {Array(6).fill(0).map((_, index) => (
                                            <input key={index} type="text" maxLength='1' required
                                                ref={e => inputRefs.current[index] = e}
                                                onInput={(e) => handleInput(e, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                            />
                                        ))}
                                    </div>
                                    <button type="submit">Verificar OTP</button>
                                </div>
                            </form>
                        </div>
                    }

                    {/*New password */}
                    {isOtpVerified && isEmailSent &&
                        <div className='reset-password-form'>
                            <form onSubmit={onSubmitNewPassword}>
                                <input
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    type="password" placeholder="New Password" required />
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password" placeholder="Confirm Password" required />
                                <button type="submit">Reset Password</button>
                            </form>
                        </div>
                    }

                </div>
            </div>
        </>
    );
};

export default ResetPassword;