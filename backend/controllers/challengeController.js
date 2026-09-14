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

module.exports = {
    createChallenge
};