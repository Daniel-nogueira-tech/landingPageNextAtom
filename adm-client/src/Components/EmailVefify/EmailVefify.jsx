
import React, { useRef, useContext, useEffect } from 'react'
import './EmailVefify.css'
import { motion } from 'framer-motion'
import { MailCheck } from 'lucide-react'
import { ContextApp } from '../../Context/ContextApp'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';


const EmailVefify = () => {
    const { Url, getUser, isLogin, user } = useContext(ContextApp)
    const navigate = useNavigate()
    const inputRefs = useRef([])

    const handleInput = (e, index) => {
        const value = e.target.value
        if (value.length === 1 && index < 5) {
            inputRefs.current[index + 1].focus()
        }
        if (value.length === 0 && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1].focus()
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1].focus()
        } else if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text')
        const otpArray = pastedData.split('')
        otpArray.forEach((char, index) => {
            inputRefs.current[index].value = char
            inputRefs.current[index].focus()
        })
    }

    const onSubmitOtp = async (e) => {
        e.preventDefault();
        try {
            const optArray = inputRefs.current.map(input => input.value)
            const otp = optArray.join('')
            console.log(otp)

            const { data } = await axios.post(`${Url}/api/authAdmin/verify-account-admin`, { otp })

            console.log("data", data)
            if (data.success) {
                getUser();
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error fetching learning content:', error);
        }
    }

    useEffect(() => {
        if (isLogin && user?.isAccountVerified) {
            navigate("/");
        }
    }, [isLogin, user]);


    return (
        <div className="reset-password-container-verify">
            <div onClick={() => navigate("/login")} className='back-btn'>
                <span>{"< Sair"}</span>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="reset-password-card-verify">
                <div className="reset-password-header-verify">
                    <h1 className="text-gradient">Verificação de Email</h1>
                </div>
                <form onSubmit={onSubmitOtp}>
                    <p>Digite o código de verificação enviado para o seu email</p>
                    <div className='otp-container'>
                        {Array(6).fill(0).map((_, index) => (
                            <input key={index} type="text" maxLength={1} required
                                ref={e => inputRefs.current[index] = e}
                                onInput={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={(e) => handlePaste(e, index)} />
                        ))}
                    </div>
                    <button type="submit"
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            gap: "10px"
                        }}> <MailCheck /> Verificar </button>
                </form>
            </motion.div>
        </div>
    )
}

export default EmailVefify