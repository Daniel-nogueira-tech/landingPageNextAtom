import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModels from "../models/userModels.js";
import transporter from "../config/nodemailer.js";
import { EMAIL_WELCOME_TEMPLATE, EMAIL_VERIFY_EMAIL_TEMPLATE, EMAIL_RESET_PASSWORD_TEMPLATE } from "../config/emailTemplates.js";
import dotenv from "dotenv";
dotenv.config();

//register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const allowedDomains = [
        "gmail.com",
        "hotmail.com",
        "outlook.com",
        "yahoo.com",
        "icloud.com",
        "bol.com.br",
        "uol.com.br",
        "globo.com",
        "ig.com.br",
        "terra.com.br"
    ];
    //validar se todos os campos foram preenchidos
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    };
    //validar dominio do email
    const emailDomain = email.split("@")[1];
    if (!allowedDomains.includes(emailDomain)) {
        return res.status(400).json({ success: false, message: "Invalid email domain" });
    }
    //regex para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "E-mail inválido" });
    }
    //validar senha
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ success: false, message: "A senha deve ter no mínimo 8 caracteres e conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial." });
    }
    //validar nome
    const nameRegex = /^[A-Za-zÀ-ÖØ-ößçÇãÃõÕáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (!nameRegex.test(name)) {
        return res.status(400).json({ success: false, message: "O nome deve conter apenas letras e espaços." });
    }

    try {
        const userExists = await userModels.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }
        //definir role como admin
        const role = process.env.ROLE_USER;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModels.create({ name, email, password: hashedPassword, role });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        //sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to our platform",
            html: EMAIL_WELCOME_TEMPLATE.replace("{{name}}", name).replace("{{email}}", email)
        };
        await transporter.sendMail(mailOptions);


        res.status(200).json({ success: true, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    //validar se todos os campos foram preenchidos
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    };
    const allowedDomains = [
        "gmail.com",
        "hotmail.com",
        "outlook.com",
        "yahoo.com",
        "icloud.com",
        "bol.com.br",
        "uol.com.br",
        "globo.com",
        "ig.com.br",
        "terra.com.br"
    ];
    //validar dominio do email
    const emailDomain = email.split("@")[1];
    if (!allowedDomains.includes(emailDomain)) {
        return res.status(400).json({ success: false, message: "email ou senha invalidos" });
    }
    //validar se o email é valido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "email ou senha invalidos" });
    }
    //validar senha
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ success: false, message: "email ou senha invalidos" });
    }


    try {
        const user = await userModels.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Incorrect username or password." })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect username or password." })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ success: true, message: "User logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//logout user
const logoutUser = async (req, res) => {
    //validar se o usuario esta logado
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({ success: false, message: "User is not logged in" })
    }
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// send verify otp
const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModels.findById(userId);

        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account already verified" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify your email",
            html: EMAIL_VERIFY_EMAIL_TEMPLATE.replace("{{otp}}", otp)
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// verify email
const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const userId = req.userId;

    if (!userId || !otp) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await userModels.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.verifyOtp) {
            return res.status(400).json({ success: false, message: "No OTP found" });
        }

        if (Number(user.verifyOtp) !== Number(otp)) {
            return res.status(400).json({ success: false, message: "Incorrect OTP" });
        }

        if (!user.verifyOtpExpireAt || user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = null;
        user.verifyOtpExpireAt = null;

        await user.save();

        return res.status(200).json({ success: true, message: "Account verified successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Check user is authenticated
const checkAuth = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModels.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        if (user.role !== process.env.ROLE_USER) {
            return res.status(400).json({ success: false, message: "User is not user" })
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// send reset otp
const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" })
    }
    try {
        const user = await userModels.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        const resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        user.resetOtp = otp;
        user.resetOtpExpireAt = resetOtpExpireAt;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Reset your password",
            html: EMAIL_RESET_PASSWORD_TEMPLATE.replace("{{otp}}", otp)
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    }
    try {
        const user = await userModels.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        if (Number(!user.resetOtp) || Number(user.resetOtp) !== Number(otp)) {
            return res.status(400).json({ success: false, message: "Incorrect OTP" })
        }
        if (!user.resetOtpExpireAt || user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();
        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { registerUser, loginUser, logoutUser, sendVerifyOtp, verifyEmail, checkAuth, sendResetOtp, resetPassword };
