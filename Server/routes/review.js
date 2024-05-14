const express = require("express");
const router = express.Router();
const Review = require("../models/Reviews");
const verifyToken = require("../middleware/verifyToken");

router.post('/review', verifyToken, async (req, res) => {
    try {
        const { collegeName, departmentName, teacherName, rating, review } = req.body;
        
        if (!collegeName || !departmentName || !teacherName || !rating || !review) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const capitalizedTeacherName = teacherName.charAt(0).toUpperCase() + teacherName.slice(1);

        const newReview = new Review({ collegeName, departmentName, teacherName:capitalizedTeacherName, rating, review });
        await newReview.save();
        
        const reviews =await Review.find({collegeName:collegeName,departmentName:departmentName,teacherName:capitalizedTeacherName});
        res.status(201).json(reviews);
    } catch (error) {
        console.error("Error adding review:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
