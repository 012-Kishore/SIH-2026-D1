const express = require("express");

const router = express.Router();

const {
    createSolution,
    getSolutions,
    getSolutionById,
    updateSolutionStatus,
    deleteSolution
} = require("../controllers/solutionController");

// Create solution
router.post("/", createSolution);

// Get all solutions
router.get("/", getSolutions);

// Get solution by ID
router.get("/:id", getSolutionById);

// Update solution status
router.put("/:id/status", updateSolutionStatus);

// Delete solution
router.delete("/:id", deleteSolution);

module.exports = router;