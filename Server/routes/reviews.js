const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const Reviews = require("../models/Reviews");

router.get('/reviews', verifyToken, async(req, res) => {
    try {
        const reviews =await Reviews.find();
        res.json(reviews);

    } catch (error) {
        console.error("Error in protected route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
