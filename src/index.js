const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const routes = require("./routes");
const errorHandler = require("./middlewares/errorMiddleware");
const requestTracker = require("./middlewares/requestTracker");
const app = express();
//handle cors
app.use(cors());

//accept and process JSON payloads.
app.use(express.json());

// Use request tracker middleware globally
app.use(requestTracker);

app.get("/health", (req, res) => {
  res.send(`Server is running`);
});

app.use("/api", routes); // All routes

// Catch-all endpoint for unmatched routes
app.all("*", (req, res) => {
  res
    .status(404)
    .send(`No endpoint found for ${req.method} ${req.originalUrl}`);
});

// Error-handling middleware (last in the middleware stack)
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on: http://localhost:${PORT}`)
);
