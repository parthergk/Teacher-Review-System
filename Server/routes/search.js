const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const Review = require("../models/Reviews");

router.post('/search', verifyToken, async (req, res) => {
    try {
        const { collegeName, departmentName, teacherName } = req.body;
        const capitalizedTeacherName = teacherName.charAt(0).toUpperCase() + teacherName.slice(1);
        const query = {};
        if (collegeName) {
            query.collegeName = collegeName;
          }
          if (departmentName) {
            query.departmentName = departmentName;
          }
          if (capitalizedTeacherName) {
            query.teacherName = capitalizedTeacherName;
          }
        const reviews = await Review.find(query);
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error in search route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
