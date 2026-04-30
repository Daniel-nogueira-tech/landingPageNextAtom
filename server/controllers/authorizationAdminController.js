import authorizationAdminModels from "../models/authorizationAdmin.js";
import userAdminModels from "../models/userAdminModels.js";
import transporter from "../config/nodemailer.js";
import { INVITE_ADMIN_TEMPLATE } from "../config/emailTemplates.js";
import dotenv from "dotenv";
import { encrypt, decrypt } from "../utils/crypto.js";
import crypto from "crypto";
import mongoose from "mongoose";

dotenv.config();


// register admin
const authorizationAdmin = async (req, res) => {
    try {
        const { email } = req.body;
        const userId = req.userId;

        if (!email) {
            return res.status(400).json({ success: false, message: "all fields are mandatory" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "invalid email" });
        }

        const emailDomain = email.split("@")[1];

        const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];
        if (!allowedDomains.includes(emailDomain)) {
            return res.status(400).json({ success: false, message: "invalid domain" });
        }

        const userAdmin = await userAdminModels.findById(userId);

        //validar se o id é valido
        if (!mongoose.Types.ObjectId.isValid(userAdmin._id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" })
        }

        if (!userAdmin) {
            return res.status(403).json({ success: false, message: "access denied" });
        }

        // Verifica se o e-mail existe
        const existing = await authorizationAdminModels.find({});
        const hasAdmin = existing.some(item => {
            const decryptedEmail = decrypt(item.email);
            return decryptedEmail === email;
        });
        if (hasAdmin) {
            return res.status(400).json({ success: false, message: "access denied, you are not authorized to be admin" });
        }

        // se o email não foi cadastrado envia o convite
        const encryptedEmail = encrypt(email);

        const invitationId = crypto.randomBytes(16).toString("hex");

        await authorizationAdminModels.create({
            email: encryptedEmail,
            role: "pending",
            invitationId
        });

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Invitation to become admin",
            html: INVITE_ADMIN_TEMPLATE.replace("{{invitationId}}", invitationId),
        });

        return res.status(200).json({
            success: true,
            message: "invitation sent"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "internal error" });
    }
};

// accept invitation
const acceptInvitation = async (req, res) => {
    try {
        const { invitationId } = req.body;

        if (!invitationId) {
            return res.status(400).json({ success: false, message: "all fields are mandatory" });
        }

        const invitation = await authorizationAdminModels.findOne({ invitationId });

        if (!invitation) {
            return res.status(404).json({ success: false, message: "invitation not found" });
        }
        //validar se o id é valido
        if (!mongoose.Types.ObjectId.isValid(invitation._id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" })
        }

        if (invitation.expiresAt < new Date()) {
            return res.status(400).json({ success: false, message: "invitation expired" });
        }
        if (invitation.role !== "pending") {
            return res.status(400).json({ success: false, message: "invitation already accepted or rejected" });
        }

        // update role to admin and remove invitationId
        invitation.role = "admin";
        invitation.invitationId = 0;
        await invitation.save();

        return res.status(200).json({
            success: true,
            message: "invitation accepted"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "internal error" });
    }
};

// Pegar os usuarios convidados
const getInvitation = async (req, res) => {
    const userId = req.userId;

    //validar se o id é valido
    if (!mongoose.Types.ObjectId.isValid(userId) || !userId || userId === null) {
        return res.status(400).json({ success: false, message: "Invalid user ID or unauthorized" })
    }

    const userAdmin = await userAdminModels.findById(userId);

    if (!userAdmin) {
        return res.status(403).json({ success: false, message: "access denied" });
    }

    try {
        // pega tudos convites de admin e pega so o email e o role
        const invitation = await authorizationAdminModels.find({}, 'email createdAt');
        if (invitation === null || invitation.length === 0) {
            return res.status(404).json({ success: false, message: "no invitations found" });
        }

        const invitations = invitation.map(invitation => ({
            _id: invitation._id,
            email: decrypt(invitation.email),
            createdAt: invitation.createdAt.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
        }));

        return res.status(200).json({
            success: true,
            message: "invitation found",
            invitation: invitations
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "internal error" });
    }
}

// Remove convite do admin
const removeInvitation = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.userId;

        //validar se o id é valido
        if (!mongoose.Types.ObjectId.isValid(userId) || !userId || userId === null) {
            return res.status(400).json({ success: false, message: "Invalid user ID or unauthorized" })
        }

        const userAdmin = await userAdminModels.findById(userId);
        //verificar que vai deletar é admin
        if (!userAdmin) {
            return res.status(403).json({ success: false, message: "access denied" });
        }

        if (!id) {
            return res.status(400).json({ success: false, message: "all fields are mandatory" });
        }

        const invitation = await authorizationAdminModels.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "invitation deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "internal error" });
    }
}





export { authorizationAdmin, acceptInvitation, getInvitation, removeInvitation };
