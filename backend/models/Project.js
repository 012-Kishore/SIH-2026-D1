const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        challenge: {
            type: String,
            required: true
        },

        university: {
            type: String,
            required: true
        },

        industryPartner: {
            type: String,
            default: "Not Assigned"
        },

        mentor: {
            type: String,
            default: "Not Assigned"
        },

        status: {
            type: String,
            enum: [
                "Proposed",
                "Under Review",
                "Approved",
                "In Progress",
                "Testing",
                "Deployed",
                "Completed"
            ],
            default: "Proposed"
        },

        progress: {
            type: Number,
            default: 10
        },

        milestone: {
            type: String,
            default: "Project Proposal"
        },

        nextStep: {
            type: String,
            default: "University Review"
        }
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;