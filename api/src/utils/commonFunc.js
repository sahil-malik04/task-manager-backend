const jwtSecret = process.env.JWTSECRET;
const jwt = require("jsonwebtoken");

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const generateToken = (data, duration) => {
  return new Promise(function (resolve, reject) {
    try {
      let token;
      if (duration) {
        token = jwt.sign(data, jwtSecret, { expiresIn: duration });
        return resolve(token);
      } else {
        token = jwt.sign(data, jwtSecret);
        return resolve(token);
      }
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = { isValidEmail, generateToken };
