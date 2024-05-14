const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const Review = require("../models/Reviews");

router.post('/search', verifyToken, async (req, res) => {
    try {
        const { collegeName, departmentName, teacherName } = req.body; // Changed from req.query to req.body
        const capitalizedTeacherName = teacherName.charAt(0).toUpperCase() + teacherName.slice(1);
        const reviews = await Review.find({ collegeName, departmentName, teacherName:capitalizedTeacherName }); // Simplified object property assignment
        res.status(200).json(reviews); // Changed status to 200 as it's a successful response

    } catch (error) {
        console.error("Error in search route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
