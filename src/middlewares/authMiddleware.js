const User = require("../models/User");
const { verifyAuthToken } = require("../utils/commonUtils");
const { status } = require("../utils/status");

const authMiddleware = async (req, res, next) => {
  try {
    const authData = await verifyAuthToken(req.headers?.authorization);

    const user = await User.findOne({
      email: authData?.email,
      isActive: true,
    });
    if (!user) {
      res.status(status.UNAUTHORIZED).send({
        message: "Unauthorized access.",
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(status.UNAUTHORIZED).send(err.message);
  }
};

module.exports = {
  authMiddleware,
};
