const express = require("express");
const jwt = require("jsonwebtoken");
const {z} = require("zod");
const bcrypt = require("bcrypt")
const User = require("../models/User");
const CollegeID = require("../models/CollegeId");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/register', async (req, res) => {
    const requiredBody = z.object({
        collegeID : z.string(),
        password: z.string().min(4)
    });

    const parsedBody = requiredBody.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(400).json({message:'Invalid Inputs'});
    }

    try {
        const { collegeID, password } = parsedBody.data;

        const verifycollegeId = await CollegeID.findOne({collegeID});
        if(!verifycollegeId){
            return res.status(400).json({ message: 'Invalid College Id' });
        }

        const userExists = await User.findOne({ collegeID });
        if (userExists) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({ collegeID, password:hashPassword });

        res.status(201).json({ message: 'Registration successfull' });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const requiredBody = z.object({
        collegeID : z.string(),
        password: z.string().min(4)
    });

    const parsedBody = requiredBody.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(400).json({message:'Invalid Inputs'});
    }

    try {
        const { collegeID, password } = parsedBody.data;
        
        const user = await User.findOne({ collegeID });
        if (!user) {
            return res.status(400).json({ message: 'Invalid College ID or password"' });
        }

        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(400).json({ message: 'Invalid College ID or password"' });
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET);

        res.cookie('token',token,{
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })

        res.status(200).json({message: 'Login successful' });
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
