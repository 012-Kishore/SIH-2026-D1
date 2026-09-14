const Challenge = require("../models/Challenge");

const createChallenge = async (req, res) => {
    try {
        const {
            title,
            description,
            domain,
            location,
            submittedBy
        } = req.body;

        const challenge = new Challenge({
            title,
            description,
            domain,
            location,
            submittedBy
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

const getChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find().sort({ createdAt: -1 });

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

module.exports = {
    createChallenge,
    getChallenges,
    getChallengeById
};