const rateLimit = require("express-rate-limit");

// 100 request for every 15min
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Too many requests from this IP, please try again after after sometime.",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
