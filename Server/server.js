const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const reviewsRoutes = require("./routes/reviews");
const reviewRoutes = require("./routes/review");
const searchRoutes = require("./routes/search");
const app = express();
const port = process.env.PORT || 3000;
const db_uri = process.env.DB_URI;

app.use(cors({
    origin: 'https://vgc-trs.vercel.app',
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mounting the routes
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
    process.exit(1); // Exit the process if database connection fails
  });


async function main() {
  try {
    await mongoose.connect(db_uri);
  } catch (err) {
    throw new Error(`Database connection error: ${err.message}`);
  }
}
