const Challenge = require("../models/Challenge");

// Create a new challenge
const createChallenge = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            domain,
            location,
            postedBy,
            submittedBy,
            priority,
            deadline
        } = req.body;

        // Accept both frontend names and backend names
        const finalDomain = domain || category;
        const finalSubmittedBy = submittedBy || postedBy;

        if (
            !title ||
            !description ||
            !finalDomain ||
            !location ||
            !finalSubmittedBy ||
            !priority ||
            !deadline
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        const challenge = new Challenge({
            title,
            description,
            domain: finalDomain,
            location,
            submittedBy: finalSubmittedBy,
            priority,
            deadline
        });

        const savedChallenge = await challenge.save();

        res.status(201).json({
            success: true,
            message: "Challenge submitted successfully",
            challenge: savedChallenge
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to submit challenge",
            error: error.message
        });
    }
};


// Get all challenges
const getChallenges = async (req, res) => {
    try {
        const { domain, category, status, search } = req.query;

        const filter = {};

        // Accept both domain and category
        if (domain || category) {
            filter.domain = domain || category;
        }

        if (status) {
            filter.status = status;
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } }
            ];
        }

        const challenges = await Challenge
            .find(filter)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: challenges.length,
            challenges
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch challenges",
            error: error.message
        });
    }
};


// Get one challenge by ID
const getChallengeById = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found"
            });
        }

        res.status(200).json({
            success: true,
            challenge
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch challenge",
            error: error.message
        });
    }
};


// Update challenge status
const updateChallengeStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            });
        }

        const challenge = await Challenge.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Challenge status updated successfully",
            challenge
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update challenge status",
            error: error.message
        });
    }
};


// Delete a challenge
const deleteChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findByIdAndDelete(req.params.id);

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Challenge deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete challenge",
            error: error.message
        });
    }
};


// Dashboard statistics
const getDashboardStats = async (req, res) => {
    try {
        const totalChallenges = await Challenge.countDocuments();

        const statusStats = await Challenge.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const domainStats = await Challenge.aggregate([
            {
                $group: {
                    _id: "$domain",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            statistics: {
                totalChallenges,
                byStatus: statusStats,
                byDomain: domainStats
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics",
            error: error.message
        });
    }
};


module.exports = {
    createChallenge,
    getChallenges,
    getChallengeById,
    updateChallengeStatus,
    deleteChallenge,
    getDashboardStats
};