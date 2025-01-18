const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const foodRoutes = require('./routes/foodRoutes'); 

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    next(); // Proceed to the next middleware
  });


// Define API routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/dishes", require("./routes/dishRoutes"));
app.use("/api/foods", require("./routes/foodRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/qr/calories", require("./routes/qrRoute"));



// Error handling middleware
app.use(errorHandler);

// Define server port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

