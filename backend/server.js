const connectDB = require("./config/db");
const challengeRoutes = require("./routes/challengeRoutes");
const solutionRoutes = require("./routes/solutionRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/challenges", challengeRoutes);
app.use("/api/solutions", solutionRoutes);


const PORT = process.env.PORT || 5000;

// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SIH Backend is running"
    });
});

// Test API
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "API is working successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});