const jwtSecret = process.env.JWTSECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { status } = require("./status");
const { failResponse } = require("./response");
const saltRounds = 10;

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

const verifyAuthToken = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      return reject(failResponse(status.UNAUTHORIZED, "Unauthorized!"));
    }

    const getToken = token.split(" ")[1];

    if (!getToken || getToken === "null") {
      return reject(failResponse(status.UNAUTHORIZED, "Unauthorized!"));
    }

    try {
      const decoded = jwt.verify(getToken, jwtSecret);
      resolve(decoded);
    } catch (err) {
      reject(failResponse(status.UNAUTHORIZED, "Invalid Token!"));
    }
  });
};

const encryptText = async (text) => {
  const result = await bcrypt.hash(text, saltRounds);
  return result;
};

const decryptAndMatch = async (cipherText, hashedPassword) => {
  const result = await bcrypt.compare(cipherText, hashedPassword);
  return result;
};

module.exports = {
  isValidEmail,
  generateToken,
  verifyAuthToken,
  encryptText,
  decryptAndMatch,
};
