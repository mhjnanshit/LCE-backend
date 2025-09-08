import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        admin_id: {
            type: String,
            default: () => new mongoose.Types.ObjectId(),
            unique: true,
        },

        email: { 
            type: String, 
            required: true, 
            unique: true 
        },

        password: { 
            type: String, 
            required: true 
        },
    },
    
    { timestamps: true }
);

export const Admin = mongoose.model("Admin", adminSchema);
