import mongoose from "mongoose";

const foundersSchema = new mongoose.Schema(
    {
        founderid: {
            type: String,
            default: () => new mongoose.Types.ObjectId(),
            unique: true,
        },

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Startup_Profile",
            required: true,
        },

        name: { 
            type: String,
            required: true 
        },

        designation: { 
            type: String 
        },

        mobile: { 
            type: String 
        },

        address: { 
            type: String 
        },

        equity: { 
            type: Number, 
            default: 0 
        },
        password: { 
            type: String, 
            required: true 
        },

        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
    },
    
    { timestamps: true }
);

export const Founders = mongoose.model("Founders", foundersSchema);
