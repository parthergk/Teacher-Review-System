const express = require("express");
const {z} = require("zod");
const router = express.Router();
const Review = require("../models/Reviews");
const verifyToken = require("../middleware/verifyToken");

router.post('/review', verifyToken, async (req, res) => {
    const requiredBody = z.object({
        collegeName:z.string(),
        departmentName:z.string(),
        teacherName:z.string(),
        rating:z.number().min(1).max(5),
        review:z.string(),
    });

    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({ message: "All fields are required or Invalid Inputs" });
    }
    try {
        const { collegeName, departmentName, teacherName, rating, review } = parsedBody.data;
        
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
