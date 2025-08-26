import mongoose from "mongoose";

const startupProfileSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            default: () => new mongoose.Types.ObjectId(),
            unique: true,
        },

        name: {
            type: String, 
            required: true 
        },

        entity_name: {
            type: String, 
            required: true 
        },

        sector: { 
            type: String, 
            required: true 
        },

        categories: { 
            type: String, 
            required: true 
        },

        year: { 
            type: Number, 
            required: true 
        },

        brand_name: { 
            type: String 
        }, // optional

        entityRegistrationStatus: { 
            type: Boolean 
        }, // optional

        stage: { 
            type: String 
        }, // optional

        detailsText: { 
            type: String 
        }, // optional

        size: { 
            type: Number, 
            required: true 
        },

        incubation_status: { 
            type: Boolean, 
            required: true 
        },

        isApproved: { 
            type: Boolean, 
            required: true 
        },

        startupIndiaRegister: { 
            type: Boolean, 
            required: true 
        },

        // Relations
        registrations: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Registration_Details",
        },

        addresses: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Registered_address" 
            },
        ],

        founders: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Founders" 
            }
        ],

        documents: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Documents" 
        },
    },
    { timestamps: true } // adds createdAt & updatedAt automatically
);

export const StartupProfile = mongoose.model(
    "Startup_Profile",
    startupProfileSchema
);
