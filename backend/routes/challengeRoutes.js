const express = require("express");

const router = express.Router();

const {
    createChallenge,
    getChallenges,
    getChallengeById,
    updateChallengeStatus,
    deleteChallenge,
    getDashboardStats
} = require("../controllers/challengeController");

// Create challenge
router.post("/", createChallenge);

// Get all challenges
// Supports:
// ?domain=Water
// ?status=Submitted
// ?search=water
router.get("/", getChallenges);

// Dashboard statistics
router.get("/dashboard/stats", getDashboardStats);

// Get challenge by ID
router.get("/:id", getChallengeById);

// Update challenge status
router.put("/:id/status", updateChallengeStatus);

// Delete challenge
router.delete("/:id", deleteChallenge);

module.exports = router;