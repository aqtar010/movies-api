// server.js
const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')
const app = express();
const port = 3000; // Change the port if needed

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/moviesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

// Routes
const movieRoutes = require("./Routes/movieRoutes");
app.use("/movies", movieRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
