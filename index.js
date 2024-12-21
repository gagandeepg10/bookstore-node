const express = require("express");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

require("dotenv").config();
const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err));

app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
