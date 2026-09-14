const express = require("express");

const router = express.Router();

const {
    createChallenge,
    getChallenges,
    getChallengeById
} = require("../controllers/challengeController");

router.post("/", createChallenge);

router.get("/", getChallenges);

router.get("/:id", getChallengeById);

module.exports = router;