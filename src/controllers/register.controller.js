import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Startup from "../models/startup.model.js";

// Register a startup
export const registerStartup = asyncHandler(async (req, res) => {
    const {
        name,
        entity_name,
        sector,
        categories,
        year,
        brand_name,
        entityRegistrationStatus,
        stage,
        detailsText,
        size,
        incubation_status,
        startupIndiaRegister,
        reg_number,
        reg_date,
        reg_certificate,
        gst,
        ipr,
        addrLine1,
        addLine2,
        state,
        city,
        district,
        pincode,
        founderName,
        designation,
        mobile,
        address,
        equity,
        password,
        email,
        pitch_deck,
        Aadhar_Number,
        Pan_Number,
        Dipp_number,
    } = req.body;

    // Minimal validation
    if (!name || !founderName || !email || !password) {
        throw new ApiError(400, [
            {
                message:
                    "Required fields missing: name, founderName, email, password",
            },
        ]);
    }

    const startup = await Startup.create({
        name,
        entity_name,
        sector,
        categories,
        year,
        brand_name,
        entityRegistrationStatus,
        stage,
        detailsText,
        size,
        incubation_status,
        isApproved: false,
        startupIndiaRegister,
        registrations: [
            {
                reg_number,
                reg_date: reg_date ? new Date(reg_date) : null,
                reg_certificate,
                gst,
                ipr,
            },
        ],
        addresses: [
            {
                addrLine1,
                addLine2,
                state,
                city,
                district,
                pincode,
            },
        ],
        founders: [
            {
                name: founderName,
                designation,
                mobile,
                address,
                equity,
                password,
                email,
            },
        ],
        documents: [
            {
                pitch_deck,
                Aadhar_Number,
                Pan_Number,
                Reg_certificate: reg_certificate,
                Dipp_number,
            },
        ],
    });

    res.status(201).json(
        new ApiResponse(201, startup, "Startup registered successfully")
    );
});
