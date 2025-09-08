import mongoose from "mongoose";

const startupSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },

        icon: { 
            type: String 
        }, // icon file name or path

        description: { 
            type: String, 
            required: true 
        },

        website: { 
            type: String 
        },

        category: { 
            type: String 
        },

        impact: { 
            type: String 
        },

        team: { 
            type: Number 
        },

        growth: { 
            type: String 
        },
    },
    
    { timestamps: true } // automatically adds createdAt and updatedAt
);

export const Startup = mongoose.model("Startup", startupSchema);