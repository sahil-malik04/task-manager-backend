const User = require("../models/User");
const { alertMessages } = require("../utils/constants");
const { successResponse, failResponse } = require("../utils/response");
const { status } = require("../utils/status");
const { isValidEmail, generateToken } = require("../utils/commonUtils");
const { encryptText, decryptAndMatch } = require("../utils/commonUtils");

async function signUpUser(payload) {
  const { name, email, password } = payload;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return failResponse(status.CONFLICT, alertMessages.ALREADY_EXIST);
    }

    if (!name || name.length < 3) {
      return failResponse(status.BAD_REQUEST, alertMessages.INVALID_NAME);
    }

    if (!isValidEmail(email)) {
      return failResponse(status.BAD_REQUEST, alertMessages.INVALID_EMAIL);
    }

    if (!password || password.length < 5) {
      return failResponse(status.BAD_REQUEST, alertMessages.INVALID_PASSWORD);
    }
    const encryptPassword = await encryptText(password);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptPassword,
    });

    let info = {
      _id: user._id,
      email: user.email,
    };

    return successResponse(status.OK, alertMessages.SIGNUP_SUCCESS, info);
  } catch (error) {
    throw failResponse(status.SERVER_FAILURE, error?.message);
  }
}

async function signInUser(payload) {
  try {
    const { email, password } = payload;

    const isEmailExist = await User.findOne({
      email: email.toLowerCase(),
      isActive: true,
    });
    if (isEmailExist) {
      const isPasswordValid = await decryptAndMatch(
        password,
        isEmailExist?.password
      );
      if (isPasswordValid) {
        let info = {
          id: isEmailExist?.id,
          email: isEmailExist?.email,
          name: isEmailExist?.name,
        };

        const token = await generateToken(info);
        info.token = token;

        return successResponse(status.OK, alertMessages.LOGIN_SUCCESS, info);
      } else {
        return failResponse(
          status.UNAUTHORIZED,
          alertMessages.UNAUTHORIZED_ACCESS
        );
      }
    } else {
      return failResponse(status.NOT_FOUND, alertMessages.EMAIL_NOT_FOUND);
    }
  } catch (error) {
    throw failResponse(status.SERVER_FAILURE, error?.message);
  }
}

module.exports = {
  signUpUser,
  signInUser,
};
