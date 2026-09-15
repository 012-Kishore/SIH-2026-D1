const Project = require("../models/Project");

// Create a new project
const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            challenge,
            university,
            industryPartner,
            mentor
        } = req.body;

        if (!title || !description || !challenge || !university) {
            return res.status(400).json({
                success: false,
                message: "Title, description, challenge and university are required"
            });
        }

        const project = new Project({
            title,
            description,
            challenge,
            university,
            industryPartner,
            mentor
        });

        const savedProject = await project.save();

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project: savedProject
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create project",
            error: error.message
        });
    }
};


// Get all projects
const getProjects = async (req, res) => {
    try {
        const { status, university, industryPartner } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (university) {
            filter.university = university;
        }

        if (industryPartner) {
            filter.industryPartner = industryPartner;
        }

        const projects = await Project
            .find(filter)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            projects
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
            error: error.message
        });
    }
};


// Get one project by ID
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            project
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch project",
            error: error.message
        });
    }
};


// Update project status and progress
const updateProjectStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const progressMap = {
            "Proposed": 10,
            "Under Review": 25,
            "Approved": 40,
            "In Progress": 60,
            "Testing": 75,
            "Deployed": 90,
            "Completed": 100
        };

        const milestoneMap = {
            "Proposed": "Project Proposal",
            "Under Review": "Proposal Review",
            "Approved": "Project Planning",
            "In Progress": "Development",
            "Testing": "Testing and Validation",
            "Deployed": "Deployment",
            "Completed": "Project Completed"
        };

        const nextStepMap = {
            "Proposed": "University Review",
            "Under Review": "Government Approval",
            "Approved": "Start Development",
            "In Progress": "Testing",
            "Testing": "Deploy Solution",
            "Deployed": "Monitor Project",
            "Completed": "Project Completed"
        };

        if (!status || progressMap[status] === undefined) {
            return res.status(400).json({
                success: false,
                message: "Valid project status is required"
            });
        }

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                status,
                progress: progressMap[status],
                milestone: milestoneMap[status],
                nextStep: nextStepMap[status]
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project status updated successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update project status",
            error: error.message
        });
    }
};


// Delete a project
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete project",
            error: error.message
        });
    }
};


module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProjectStatus,
    deleteProject
};