const express = require("express");
const router = express.Router();
const Reviews = require("../models/Reviews");

router.get('/reviews',  async(req, res) => {
    try {
        const reviews =await Reviews.find();
        res.status(200).json({reviews:reviews});
    } catch (error) {
        console.error("Error in protected route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
