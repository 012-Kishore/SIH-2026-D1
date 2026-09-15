const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        domain: {
            type: String,
            required: true,
            enum: [
                "Education",
                "Healthcare",
                "Environment",
                "Technology",
                "Agriculture",
                "Water",
                "Energy",
                "Urban Development",
                "Accessibility",
                "Public Administration",
                "Rural Livelihoods"
            ]
        },

        location: {
            type: String,
            required: true
        },

        submittedBy: {
            type: String,
            required: true
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },

        deadline: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Submitted",
                "Under Review",
                "Validated",
                "Assigned",
                "In Progress",
                "Completed"
            ],
            default: "Submitted"
        }
    },
    {
        timestamps: true
    }
);

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;