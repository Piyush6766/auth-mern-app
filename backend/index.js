const express = require("express");
const app = express();
const cors = require("cors");
const AuthRouter = require("./Routs/AuthRouter"); 
const ProductRouter = require("./Routs/ProductRouter"); 

// Load environment variables from .env file
require("dotenv").config();
require("./Models/db"); // Ensure this file exists and connects to your database

// Use PORT from .env or fallback to 5000
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// routs
app.get("/home", (req, res) => {
  res.send("Hello, World!");
});

app.use("/auth", AuthRouter); // Use the AuthRouter for authentication routes
app.use("/products", ProductRouter ); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
