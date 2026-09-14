const express = require("express");

const router = express.Router();

const {
    createChallenge,
    getChallenges
} = require("../controllers/challengeController");

router.post("/", createChallenge);

router.get("/", getChallenges);

module.exports = router;