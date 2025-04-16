const bcrypt = require("bcrypt");
const saltRounds = 10;

const encryptText = async (text) => {
  const result = await bcrypt.hash(text, saltRounds);
  return result;
};

const decryptAndMatch = async (cipherText, hashedPassword) => {
  const result = await bcrypt.compare(cipherText, hashedPassword);
  return result;
};

module.exports = {
  encryptText,
  decryptAndMatch,
};
