import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-secret";

export const generateAccessToken = (userId, email, isFounder) => {
    const payload = {
        userId,
        email,
        ...(isFounder ? { founder_id: userId } : { admin_id: userId }),
    };
    return jwt.sign(
        payload, 
        accessTokenSecret, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { userId }, 
        refreshTokenSecret, 
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, accessTokenSecret);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, refreshTokenSecret);
};
