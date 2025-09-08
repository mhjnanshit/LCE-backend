import mongoose from "mongoose";

const registeredAddressSchema = new mongoose.Schema(
    {
        addrLine1: { 
            type: String, 
            required: true 
        },

        addrLine2: { 
            type: String 
        },

        state: { 
            type: String, 
            required: true 
        },

        city: { 
            type: String, 
            required: true 
        },

        district: { 
            type: String 
        },

        pincode: { 
            type: Number, 
            required: true 
        },

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Startup_Profile",
            required: true,
        },
    },
    { timestamps: true }
);

// Compound unique index ([user_id, addr_id])
registeredAddressSchema.index({ 
    user_id: 1, _id: 1 
}, { unique: true });

export const RegisteredAddress = mongoose.model(
    "Registered_address",
    registeredAddressSchema
);
