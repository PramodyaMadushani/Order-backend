const express = require("express");
const dbConnection = require("./config/db");
const orderRoutes = require("./routes/orders");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Use CORS for handling cross-origin requests
app.use(cors({ origin: true, credentials: true }));

// Connect to the database
dbConnection();

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route for testing
app.get("/", (req, res) => res.send("Hello World"));

// Order routes
app.use("/api/order", orderRoutes); // Make sure this matches your routes

const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
