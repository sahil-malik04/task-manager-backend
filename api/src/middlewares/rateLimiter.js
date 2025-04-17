const rateLimit = require("express-rate-limit");

// 80 request per 1 min
const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 80,
  message:
    "Too many requests from this IP, please try again after after sometime.",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
