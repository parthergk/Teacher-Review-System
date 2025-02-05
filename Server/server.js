const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const reviewsRoutes = require("./routes/reviews");
const reviewRoutes = require("./routes/review");
const searchRoutes = require("./routes/search");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const db_uri = process.env.DB_URI;

// console.log(db_uri);

app.use(cors({
  // origin: 'http://localhost:5173',
  // origin: ' http://localhost:1234',
    origin: 'https://vgc-trs.vercel.app',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', reviewsRoutes);
app.use('/api', reviewRoutes);
app.use('/api', searchRoutes);

main()
  .then(() => {
    console.log("DB Connected");
    app.listen(port, () => {
      console.log(`Server started successfully on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
    process.exit(1);
  });


async function main() {
  try {
    await mongoose.connect(db_uri);
  } catch (err) {
    throw new Error(`Database connection error: ${err.message}`);
  }
}
