import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true 
        },

        description: { 
            type: String 
        },

        icon: { 
            type: String 
        }, // file name or path

        features: [{ 
            type: String 
        }], // array of strings
    },
    
    { timestamps: true }
);

export const Program = mongoose.model("Program", programSchema);
