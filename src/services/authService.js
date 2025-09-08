import Founders from "../models/founder.model.js";
import Admin from "../models/admin.model.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";


// Founder Services

export const findFounderByEmail = async (email) => {
    return await Founders.findOne({ email });
};

export const registerFounder = async (email, password, userId) => {
    try {
        const existingFounder = await findFounderByEmail(email);
        if (existingFounder) {
            throw new ApiError(400, [
                { message: "Founder with this email already exists." },
            ]);
        }

        const hashedPassword = await hashPassword(password);

        return await Founders.create({
            email,
            password: hashedPassword,
            user_id: userId,
        });
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, [
            { message: "Error registering founder: " + error.message },
        ]);
    }
};

export const loginFounder = async (email, password) => {
    try {
        const founder = await findFounderByEmail(email);
        if (!founder || !(await comparePassword(password, founder.password))) {
            throw new ApiError(401, [{ message: "Invalid credentials" }]);
        }

        const accessToken = generateAccessToken(
            founder._id,
            founder.email,
            true
        );
        const refreshToken = generateRefreshToken(founder._id);

        return {
            accessToken,
            refreshToken,
            email: founder.email,
            founder_id: founder._id,
        };
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, [
            { message: "Error logging in founder: " + error.message },
        ]);
    }
};


// Admin Services

export const findAdminByEmail = async (email) => {
    return await Admin.findOne({ email });
};

export const registerAdmin = async (email, password) => {
    try {
        const existingAdmin = await findAdminByEmail(email);
        if (existingAdmin) {
            throw new ApiError(400, [
                { message: "Admin with this email already exists." },
            ]);
        }

        const hashedPassword = await hashPassword(password);

        return await Admin.create({
            email,
            password: hashedPassword,
        });
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, [
            { message: "Error registering admin: " + error.message },
        ]);
    }
};

export const loginAdmin = async (email, password) => {
    try {
        const admin = await findAdminByEmail(email);
        if (!admin || !(await comparePassword(password, admin.password))) {
            throw new ApiError(401, [{ message: "Invalid credentials" }]);
        }

        const accessToken = generateAccessToken(admin._id, admin.email, false);
        const refreshToken = generateRefreshToken(admin._id);

        return {
            accessToken,
            refreshToken,
            email: admin.email,
            admin_id: admin._id,
        };
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, [
            { message: "Error logging in admin: " + error.message },
        ]);
    }
};
