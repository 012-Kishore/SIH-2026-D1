const express = require("express");
const {
    createProject,
    getProjects,
    getProjectById,
    updateProjectStatus,
    deleteProject
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject);

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.put("/:id/status", updateProjectStatus);

router.delete("/:id", deleteProject);

module.exports = router;