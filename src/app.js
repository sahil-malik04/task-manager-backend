require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const routes = require("./routes");
const { status } = require("./utils/status");
const rateLimiter = require("./middlewares/rateLimiter");

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimiter);

app.use("/api", routes);

// for undefined routes
app.use((req, res) => {
  res.status(status.NOT_FOUND).send("Route not found");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Backend listening on the port: ${PORT}`);
  });
}

module.exports = app;
