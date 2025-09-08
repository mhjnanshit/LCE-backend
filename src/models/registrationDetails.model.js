import mongoose from "mongoose";

const registrationDetailsSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId, // link to Startup_Profile
            ref: "Startup_Profile",
            required: true,
        },
        reg_number: {
            type: String,
            required: true,
            unique: true, // make sure no duplicate registration numbers
        },
        reg_date: {
            type: Date,
            required: true,
        },
        reg_certificate: {
            type: String, 
            required: true,
        },
        gst: {
            type: String,
            required: true,
        },
        ipr: {
            type: Boolean, // whether Intellectual Property Rights filed (boolean)
            default: false,
        },
    },
    { timestamps: true }
);

// Composite key concept (user_id + reg_number) (For faster queries)
registrationDetailsSchema.index(     // Ensures Data Integrity
    { user_id: 1, reg_number: 1 },
    { unique: true }
);

export const RegistrationDetails = mongoose.model(
    "Registration_Details",
    registrationDetailsSchema
);
