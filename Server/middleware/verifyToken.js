const jwt = require("jsonwebtoken");
const { z } = require("zod");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

module.exports = (req, res, next) => {
  const tokenSchema = z.string();

  log
  try {
    const parseToken = tokenSchema.safeParse(req.cookies.token);

    if (!parseToken.success) {
      res.status(401).json({ message: "You must log in" });
      return;
    }

    jwt.verify(parseToken.data, JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({ message: "You must log in" });
      }
      const { _id } = payload;
      req.studentID = _id;
      next();
    });
  } catch (error) {
    console.error("Server-side error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
