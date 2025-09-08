import mongoose from "mongoose";

const documentsSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Startup_Profile",
            required: true,
            unique: true,
        },

        pitch_deck: {
            type: String,
        },

        Aadhar_Number: {
            type: String,
        },

        Pan_Number: {
            type: String,
        },

        Reg_certificate: {
            type: String,
            unique: true,
        },

        Dipp_number: {
            // each startup’s DPIIT number (Department of Industrial Policy & Promotion number)
            type: String,
            unique: true,
        },
    },

    { timestamps: true }
);

export const Documents = mongoose.model("Documents", documentsSchema);
