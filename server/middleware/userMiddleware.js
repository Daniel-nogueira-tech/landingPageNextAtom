import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    const { token } = req.cookies;

    try {
        if (!token) {
            return res.json({ success: false, message: "Unauthorized token not received." })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.id) {
            req.userId = decoded.id;
            next();
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized decoded id not received." })
        }

    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }
}

export default userAuth;
