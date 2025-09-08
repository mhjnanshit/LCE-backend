import mongoose from "mongoose";

const eventRegistrationsSchema = new mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Events",
            required: true,
        },

        name: { 
            type: String, 
            required: true 
        },

        number: { 
            type: String, 
            required: true 
        },

        email: { 
            type: String, 
            required: true 
        },
    },

    { timestamps: true }
);

// Index to quickly find all registrations for an event
eventRegistrationsSchema.index({ eventId: 1 });

// Without an index
// MongoDB does a collection scan → checks every document one by one.
// Works fine if there are just a few registrations.
// Becomes slow if there are hundreds, thousands, or more.

// Without an index
// MongoDB does a collection scan → checks every document one by one.
// Works fine if there are just a few registrations.
// Becomes slow if there are hundreds, thousands, or more.

export const EventRegistrations = mongoose.model(
    "Event_Registrations",
    eventRegistrationsSchema
);
