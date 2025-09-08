import { verifyAccessToken } from "../utils/jwt";

// No DB call , no need for asyncHandler

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
        const payload = verifyAccessToken(token); // { userId, email, role }
        req.user = payload;
        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
};