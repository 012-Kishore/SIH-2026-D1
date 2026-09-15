const Solution = require("../models/Solution");

// Create a new solution
const createSolution = async (req, res) => {
    try {
        const {
            title,
            description,
            approach,
            impact,
            challenge
        } = req.body;

        if (!title || !description || !approach || !impact || !challenge) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        const solution = new Solution({
            title,
            description,
            approach,
            impact,
            challenge
        });

        const savedSolution = await solution.save();

        res.status(201).json({
            success: true,
            message: "Solution submitted successfully",
            solution: savedSolution
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to submit solution",
            error: error.message
        });
    }
};


// Get all solutions
const getSolutions = async (req, res) => {
    try {
        const { status, challenge } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (challenge) {
            filter.challenge = challenge;
        }

        const solutions = await Solution
            .find(filter)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: solutions.length,
            solutions
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch solutions",
            error: error.message
        });
    }
};


// Get one solution by ID
const getSolutionById = async (req, res) => {
    try {
        const solution = await Solution.findById(req.params.id);

        if (!solution) {
            return res.status(404).json({
                success: false,
                message: "Solution not found"
            });
        }

        res.status(200).json({
            success: true,
            solution
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch solution",
            error: error.message
        });
    }
};


// Update solution status
const updateSolutionStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const progressMap = {
            "Submitted": 25,
            "Under Review": 50,
            "Approved": 65,
            "Implementation": 80,
            "Completed": 100
        };

        const nextStepMap = {
            "Submitted": "Initial Review",
            "Under Review": "Government Review",
            "Approved": "Implementation",
            "Implementation": "Final Deployment",
            "Completed": "Project Completed"
        };

        if (!status || !progressMap[status]) {
            return res.status(400).json({
                success: false,
                message: "Valid solution status is required"
            });
        }

        const solution = await Solution.findByIdAndUpdate(
            req.params.id,
            {
                status,
                progress: progressMap[status],
                nextStep: nextStepMap[status]
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!solution) {
            return res.status(404).json({
                success: false,
                message: "Solution not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Solution status updated successfully",
            solution
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update solution status",
            error: error.message
        });
    }
};


// Delete a solution
const deleteSolution = async (req, res) => {
    try {
        const solution = await Solution.findByIdAndDelete(req.params.id);

        if (!solution) {
            return res.status(404).json({
                success: false,
                message: "Solution not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Solution deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete solution",
            error: error.message
        });
    }
};


module.exports = {
    createSolution,
    getSolutions,
    getSolutionById,
    updateSolutionStatus,
    deleteSolution
};