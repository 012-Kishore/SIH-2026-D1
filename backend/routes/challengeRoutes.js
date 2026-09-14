const express = require("express");

const router = express.Router();

const {
    createChallenge
} = require("../controllers/challengeController");

router.post("/", createChallenge);

module.exports = router;