import asyncHandler from "../utils/asyncHandler.js";
import Startup from "../models/startup.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ----------------------
// Add a new startup
// ----------------------
export const addStartup = asyncHandler(async (req, res) => {
    const { name, icon, description, website, category, impact, team, growth } =
        req.body;

    if (!name || !icon || !description || !website) {
        throw new ApiError(400, [
            {
                message:
                    "Required fields missing: name, icon, description, website",
            },
        ]);
    }

    const startup = await Startup.create({
        name,
        icon,
        description,
        website,
        category,
        impact,
        team,
        growth,
    });

    res.status(201).json(
        new ApiResponse(201, startup, "Startup added successfully")
    );
});

// ----------------------
// Get all startups
// ----------------------
export const getStartups = asyncHandler(async (req, res) => {
    const startups = await Startup.find();
    res.status(200).json(
        new ApiResponse(200, startups, "Startups fetched successfully")
    );
});

// ----------------------
// Get a single startup by ID
// ----------------------
export const getStartup = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) throw new ApiError(400, [{ message: "Startup ID is required" }]);

    const startup = await Startup.findById(id);

    if (!startup) throw new ApiError(404, [{ message: "Startup not found" }]);

    res.status(200).json(
        new ApiResponse(200, startup, "Startup fetched successfully")
    );
});

// ----------------------
// Update a startup
// ----------------------
export const updateStartup = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, icon, description, website, category, impact, team, growth } =
        req.body;

    if (!id) throw new ApiError(400, [{ message: "Startup ID is required" }]);

    const updatedStartup = await Startup.findByIdAndUpdate(
        id,
        { name, icon, description, website, category, impact, team, growth },
        { new: true } // return updated doc
    );

    if (!updatedStartup)
        throw new ApiError(404, [{ message: "Startup not found" }]);

    res.status(200).json(
        new ApiResponse(200, updatedStartup, "Startup updated successfully")
    );
});

// ----------------------
// Delete a startup
// ----------------------
export const deleteStartup = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) throw new ApiError(400, [{ message: "Startup ID is required" }]);

    const deleted = await Startup.findByIdAndDelete(id);

    if (!deleted) throw new ApiError(404, [{ message: "Startup not found" }]);

    res.status(200).json(
        new ApiResponse(200, null, "Startup deleted successfully")
    );
});
