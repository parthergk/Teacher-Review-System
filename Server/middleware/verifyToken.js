const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({message: "You must log in" });
    }

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ message: "You must log in" });
        }

        const { _id } = payload;

        User.findById(_id)
            .then(userdata => {
                if (!userdata) {
                    return res.status(404).json({ message: "User not found" });
                }
                req.user = userdata;
                next();
            })
            .catch(err => {
                console.error("Error finding user:", err);
                return res.status(500).json({ message: "Internal server error" });
            });
    });
};
