import asyncHandler from "../utils/asyncHandler.js";
import * as authService from "../services/auth.service.js";
import { verifyRefreshToken, generateAccessToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ----------------------
// Register Founder
// ----------------------
export const registerFounder = asyncHandler(async (req, res) => {
    const { email, password, userId } = req.body;

    const existingFounder = await authService.findFounderByEmail(email);
    if (existingFounder) {
        throw new ApiError(400, [{ message: "Founder already exists" }]);
    }

    const founder = await authService.registerFounder(email, password, userId);

    const response = new ApiResponse(
        201,
        founder,
        "Founder registered successfully"
    );
    res.status(201).json(response);
});

// ----------------------
// Register Admin
// ----------------------
export const registerAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existingAdmin = await authService.findAdminByEmail(email);
    if (existingAdmin) {
        throw new ApiError(400, [{ message: "Admin already exists" }]);
    }

    const admin = await authService.registerAdmin(email, password);

    const response = new ApiResponse(
        201,
        admin,
        "Admin registered successfully"
    );
    res.status(201).json(response);
});

// ----------------------
// Login Founder
// ----------------------
export const loginFounder = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const {
        accessToken,
        refreshToken,
        founder_id,
        email: userEmail,
    } = await authService.loginFounder(email, password);

    const responseData = {
        accessToken,
        refreshToken,
        email: userEmail,
        founder_id,
    };
    const response = new ApiResponse(
        200,
        responseData,
        "Founder signed in successfully"
    );

    res.status(200).json(response);
});

// ----------------------
// Login Admin
// ----------------------
export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const {
        accessToken,
        refreshToken,
        admin_id,
        email: userEmail,
    } = await authService.loginAdmin(email, password);

    const responseData = {
        accessToken,
        refreshToken,
        email: userEmail,
        admin_id,
    };
    const response = new ApiResponse(
        200,
        responseData,
        "Admin signed in successfully"
    );

    res.status(200).json(response);
});

// ----------------------
// Refresh Access Token
// ----------------------
export const refreshAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        throw new ApiError(400, [{ message: "Refresh token is required" }]);
    }

    let payload;
    try {
        payload = verifyRefreshToken(refreshToken);
    } catch (err) {
        throw new ApiError(401, [{ message: "Invalid refresh token" }]);
    }

    const userId = payload.userId;
    let user;

    if (payload.founder_id) {
        user = await authService.findFounderByEmail(payload.founder_id);
    } else if (payload.admin_id) {
        user = await authService.findAdminByEmail(payload.admin_id);
    }

    if (!user) {
        throw new ApiError(404, [{ message: "User not found" }]);
    }

    const newAccessToken = generateAccessToken(
        user._id,
        user.email,
        !!payload.founder_id
    );

    const response = new ApiResponse(
        200,
        { accessToken: newAccessToken },
        "Access token refreshed"
    );
    res.status(200).json(response);
});
