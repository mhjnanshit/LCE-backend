import asyncHandler from "../utils/asyncHandler.js";
import EventRegistrations from "../models/eventRegistration.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ----------------------
// Get all registrations for an event
// ----------------------
export const getRegistrations = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    if (!eventId) {
        throw new ApiError(400, [{ message: "Event ID is required" }]);
    }

    const registrations = await EventRegistrations.find({ eventId });

    const response = new ApiResponse(
        200,
        registrations,
        "Registrations fetched successfully"
    );
    res.status(200).json(response);
});

// ----------------------
// Register for an event
// ----------------------
export const registerEvent = asyncHandler(async (req, res) => {
    const { eventId, name, number, email } = req.body;

    if (!eventId || !name || !number || !email) {
        throw new ApiError(400, [
            {
                message:
                    "All fields are required: eventId, name, number, email",
            },
        ]);
    }

    const registration = await EventRegistrations.create({
        eventId,
        name,
        number,
        email,
    });

    const response = new ApiResponse(
        201,
        registration,
        "Event registration successful"
    );
    res.status(201).json(response);
});

// ----------------------
// Get registrations by user email
// ----------------------
export const getRegistrationsByEmail = asyncHandler(async (req, res) => {
    const { email } = req.query;

    if (!email || typeof email !== "string") {
        throw new ApiError(400, [{ message: "Email is required" }]);
    }

    const registrations = await EventRegistrations.find({ email });

    const response = new ApiResponse(
        200,
        registrations,
        "Registrations fetched successfully"
    );
    res.status(200).json(response);
});
