import asyncHandler from "../utils/asyncHandler.js";
import Events from "../models/event.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get all events
export const getEvents = asyncHandler(async (req, res) => {
    const events = await Events.find();
    res.status(200).json(
        new ApiResponse(200, events, "Events fetched successfully")
    );
});

// Add a new event
export const addEvent = asyncHandler(async (req, res) => {
    const { name, posterLink, date, description } = req.body;

    if (!name || !posterLink || !date || !description) {
        throw new ApiError(400, [{ message: "All fields are required" }]);
    }

    const event = await Events.create({
        name,
        posterLink,
        date: new Date(date),
        description,
    });

    res.status(201).json(
        new ApiResponse(201, event, "Event added successfully")
    );
});

// Update an existing event
export const updateEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, posterLink, date, description } = req.body;

    if (!id) throw new ApiError(400, [{ message: "Event ID is required" }]);

    const updatedEvent = await Events.findByIdAndUpdate(
        id,
        {
            name,
            posterLink,
            date: date ? new Date(date) : undefined,
            description,
        },
        { new: true } // return updated doc
    );

    if (!updatedEvent)
        throw new ApiError(404, [{ message: "Event not found" }]);

    res.status(200).json(
        new ApiResponse(200, updatedEvent, "Event updated successfully")
    );
});
