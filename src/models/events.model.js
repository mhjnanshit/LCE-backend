import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },

        posterLink: { 
            type: String 
        },

        date: { 
            type: Date, 
            required: true 
        },

        description: { 
            type: String 
        },
    },
    
    { timestamps: true }
);

export const Events = mongoose.model("Events", eventsSchema);
