import asyncHandler from "../utils/asyncHandler.js";
import Program from "../models/program.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ----------------------
// Get all programs
// ----------------------
export const getPrograms = asyncHandler(async (req, res) => {
    const programs = await Program.find();
    res.status(200).json(
        new ApiResponse(200, programs, "Programs fetched successfully")
    );
});

// ----------------------
// Get a single program by ID
// ----------------------
export const getProgram = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) throw new ApiError(400, [{ message: "Program ID is required" }]);

    const program = await Program.findById(id);

    if (!program) throw new ApiError(404, [{ message: "Program not found" }]);

    res.status(200).json(
        new ApiResponse(200, program, "Program fetched successfully")
    );
});

// ----------------------
// Add a new program
// ----------------------
export const addProgram = asyncHandler(async (req, res) => {
    const { title, description, icon, features } = req.body;

    if (!title || !description) {
        throw new ApiError(400, [
            { message: "Title and description are required" },
        ]);
    }

    const newProgram = await Program.create({
        title,
        description,
        icon,
        features,
    });

    res.status(201).json(
        new ApiResponse(201, newProgram, "Program added successfully")
    );
});

// ----------------------
// Update an existing program
// ----------------------
export const updateProgram = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, icon, features } = req.body;

    if (!id) throw new ApiError(400, [{ message: "Program ID is required" }]);

    const updatedProgram = await Program.findByIdAndUpdate(
        id,
        { title, description, icon, features },
        { new: true } // return updated doc
    );

    if (!updatedProgram)
        throw new ApiError(404, [{ message: "Program not found" }]);

    res.status(200).json(
        new ApiResponse(200, updatedProgram, "Program updated successfully")
    );
});

// ----------------------
// Delete a program
// ----------------------
export const deleteProgram = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) throw new ApiError(400, [{ message: "Program ID is required" }]);

    const deleted = await Program.findByIdAndDelete(id);

    if (!deleted) throw new ApiError(404, [{ message: "Program not found" }]);

    res.status(200).json(
        new ApiResponse(200, null, "Program deleted successfully")
    );
});
