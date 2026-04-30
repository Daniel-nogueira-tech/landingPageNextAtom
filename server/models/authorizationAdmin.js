import mongoose from "mongoose";

const authorizationAdminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "super_admin", "pending"] },
    invitationId: { type: String, required: true },
}, { timestamps: true });

const AuthorizationAdmin = mongoose.model("AuthorizationAdmin", authorizationAdminSchema);

export default AuthorizationAdmin;
