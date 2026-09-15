const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        approach: {
            type: String,
            required: true
        },

        impact: {
            type: String,
            required: true
        },

        challenge: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Submitted",
                "Under Review",
                "Approved",
                "Implementation",
                "Completed"
            ],
            default: "Submitted"
        },

        progress: {
            type: Number,
            default: 25
        },

        nextStep: {
            type: String,
            default: "Initial Review"
        }
    },
    {
        timestamps: true
    }
);

const Solution = mongoose.model("Solution", solutionSchema);

module.exports = Solution;