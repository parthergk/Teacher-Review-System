const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CollegeID = require("../models/CollegeId");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// User registration endpoint
router.post('/register', async (req, res) => {
    try {
        const { collegeID, password } = req.body;

        const verifycollegeId = await CollegeID.findOne({collegeID});
        if(!verifycollegeId){
            return res.status(400).json({ message: 'Invalid College Id' });
        }

        // Check if the user already exists
        const userExists = await User.findOne({ collegeID });
        if (userExists) {
            return res.status(400).json({ message: 'User already registered' });
        }

        // Create a new user without hashing the password
        const newUser = new User({ collegeID, password });
        await newUser.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User login endpoint
router.post('/login', async (req, res) => {
    try {
        const { collegeID, password } = req.body;
        
        // Check if the user exists
        const user = await User.findOne({ collegeID });
        if (!user) {
            return res.status(400).json({ message: 'Invalid CollegeId' });
        }

        // Compare passwords
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid Pssword' });
        }

        // User authenticated, generate and send JWT token
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        res.json({ token, message: 'Login successful' });
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
