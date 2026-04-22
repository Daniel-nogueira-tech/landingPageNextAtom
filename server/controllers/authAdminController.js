import userAdminModels from "../models/userAdminModels.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import transporter from "../config/nodemailer.js";
import { EMAIL_WELCOME_TEMPLATE, EMAIL_VERIFY_EMAIL_TEMPLATE, EMAIL_RESET_PASSWORD_TEMPLATE } from "../config/emailTemplates.js";

dotenv.config();


// register admin
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    //validar se todos os campos foram preenchidos
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    };
    //validar dominio do email
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
        const user = await userAdminModels.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        //pegar o role do .env
        const role = process.env.ROLE_ADMIN || "admin";

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userAdminModels.create({
            name,
            email,
            password: hashedPassword,
            role: role
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_ADMIN, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 24 * 60 * 60 * 1000
        });
        console.log("add cookie");

        //enviar email de boas vindas
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to NextAtom",
            text: `Welcome to our NextAtom.Your account has been created with email ${email}.`,
            html: EMAIL_WELCOME_TEMPLATE.replace("{{name}}", name).replace("{{email}}", email)
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//login admin
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    //validar se todos os campos foram preenchidos
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    };
    console.log(email, password);
    //validar dominio do email
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
        const user = await userAdminModels.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        //verificar se o usuario é admin
        const isAdmin = user.role === process.env.ROLE_ADMIN;
        if (!isAdmin) {
            return res.status(400).json({ success: false, message: "User is not admin" })
        }

        //comparar senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password or email" })
        }
        //gerar token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_ADMIN, { expiresIn: "1d" });
        res.cookie("tokenAdmin", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// logout admin
const logoutAdmin = async (req, res) => {
    if (!req.cookies.tokenAdmin) {
        return res.status(400).json({ success: false, message: "Admin not logged in" })
    }
    try {
        res.clearCookie("tokenAdmin", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ success: true, message: "Admin logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// send otp to email
const sendVerifyOtpAdmin = async (req, res) => {

    try {
        const userId = req.userId;
        const user = await userAdminModels.findById(userId);
        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "User is already verified" })
        }

        //gerar otp
        const otp = String(Math.floor(1000 + Math.random() * 9000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        //enviar otp para o email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify your email",
            html: EMAIL_VERIFY_EMAIL_TEMPLATE.replace("{{otp}}", otp)
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// verify email
const verifyEmailAdmin = async (req, res) => {
    const { otp } = req.body;
    const userId = req.userId;
    //validar se todos os campos foram preenchidos
    if (!userId || !otp) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    };
    try {
        const user = await userAdminModels.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        if (user.verifyOtp !== otp || user.verifyOtp === "") {
            return res.status(400).json({ success: false, message: "Invalid OTP" })
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP has expired" })
        }
        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;

        await user.save();
        res.status(200).json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Check user is authenticated
const checkUserAdminAuthenticated = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userAdminModels.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        if (user.role !== process.env.ROLE_ADMIN) {
            return res.status(400).json({ success: false, message: "User is not admin" })
        }
        res.status(200).json({ success: true, message: "User is authenticated" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// forgot password
const sendPasswordOtpAdmin = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    //validar se todos os campos foram preenchidos
    if (!email) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    };
    try {
        const user = await userAdminModels.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        if (user.role !== process.env.ROLE_ADMIN) {
            return res.status(400).json({ success: false, message: "User is not admin" })
        }
        //gerar otp
        const otp = String(Math.floor(1000 + Math.random() * 9000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        //enviar otp para o email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Forgot password",
            html: EMAIL_RESET_PASSWORD_TEMPLATE.replace("{{otp}}", otp)
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// reset password
const resetPasswordAdmin = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    //validar se todos os campos foram preenchidos
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    };

    //validar senha
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({ success: false, message: "Invalid email or password, or weak password." });
    }
    try {
        const user = await userAdminModels.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        if (Number(!user.resetOtp) || Number(user.resetOtp) !== Number(otp)) {
            return res.status(400).json({ success: false, message: "Incorrect OTP" })
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP has expired" })
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;
        await user.save();
        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export { registerAdmin, loginAdmin, logoutAdmin, sendVerifyOtpAdmin, verifyEmailAdmin, checkUserAdminAuthenticated, sendPasswordOtpAdmin, resetPasswordAdmin };