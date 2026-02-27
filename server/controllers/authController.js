import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModels from "../models/userModels.js";
import transporter from "../config/nodemailer.js";
import { EMAIL_WELCOME_TEMPLATE, EMAIL_VERIFY_EMAIL_TEMPLATE, EMAIL_RESET_PASSWORD_TEMPLATE } from "../config/emailTemplates.js";

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    };

    try {
        const userExists = await userModels.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModels.create({ name, email, password: hashedPassword });

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

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    };

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

const logoutUser = async (req, res) => {
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
    console.log(email, otp, newPassword);

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
