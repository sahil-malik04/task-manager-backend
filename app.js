require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("./api/src/config/db");
const routes = require("./api/src/routes");
const { status } = require("./api/src/utils/status");
const rateLimiter = require("./api/src/middlewares/rateLimiter");

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

app.listen(PORT, () => {
  console.log(`Backend listening on the port: ${PORT}`);
});
