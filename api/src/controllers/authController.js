const { signUpUser, signInUser } = require("../services/authService");
const { successAction, failAction } = require("../utils/responseAction");

exports.signUp = async function (req, res) {
  try {
    const payload = req.body;
    const result = await signUpUser(payload);
    res.status(result.status).json(successAction(result));
  } catch (err) {
    res.status(err.status).json(failAction(err));
  }
};

exports.signIn = async function (req, res) {
  try {
    const payload = req.body;
    const result = await signInUser(payload);
    res.status(result.status).json(successAction(result));
  } catch (err) {
    res.status(err.status).json(failAction(err));
  }
};
