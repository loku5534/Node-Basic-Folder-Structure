const otpGenerator = require("otp-generator");
const {
  loginSchema,
  singupSchema,
  resetPasswordSchema,
  updatePasswordSchema,
} = require("../utils/schema");
const { Users } = require("../models");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jsonwebtoken");

const login = (req, res) => {
  loginSchema
    .validate(req.body)
    .then(async (validatedData) => {
      let user = await Users.findOne({
        email: validatedData.email,
      });
      if (user !== null) {
        if (await user.comparePassword(validatedData.password)) {
          const token = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);
          res.status(200).json({
            message: "Logged in successfully!",
            user: user,
            token: token,
            refreshToken: refreshToken,
          });
        } else {
          res.status(403).json({
            error: "Invalid credentials!",
          });
        }
      } else {
        res.status(404).json({
          error: "An account with the given credentials not found!",
        });
      }
    })
    .catch((error) => {
      res.json({
        error: error.errors,
      });
    });
};

const register = (req, res) => {
  singupSchema
    .validate(req.body)
    .then(async (validatedData) => {
      let user = await Users.findOne({
        email: validatedData.email,
      });
      if (user == null) {
        user = await Users.create(validatedData);
        res.json(user);
      } else {
        res.status(409).json({
          error: "Email already exists!",
        });
      }
    })
    .catch((error) => {
      res.status(422).json({
        error: error.errors[0],
      });
    });
};

const resetPassword = (req, res) => {
  resetPasswordSchema
    .validate(req.body)
    .then(async (validatedData) => {
      let user = await Users.findOne({
        email: validatedData.email,
      });
      if (user !== null) {
        user.otp = otpGenerator.generate(6, {
          digits: true,
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });
        user.save();
      }
      res.status(200).json({
        user: user,
      });
    })
    .catch((error) => {
      res.status(422).json({
        error: error.errors[0],
      });
    });
};

const createPassword = (req, res) => {
  createPasswordSchema
    .validate(req.body)
    .then(async (validatedData) => {
      let user = await Users.findOne({
        email: validatedData.email,
        otp: validatedData.otp,
      });
      if (user !== null) {
        user.password = validatedData.password;
        res.status(200).json({
          success: "Password reset successfully!",
        });
      } else {
        res.status(409).json({
          error: "Invalid otp code!",
        });
      }
    })
    .catch((error) => {
      res.status(422).json({
        error: error.errors[0],
      });
    });
};
const myProfile = async (req, res) => {
  let user = await Users.findById(req.user._id);
  console.log(user);
  if (user !== null) {
    res.status(200).json({
      user: user,
    });
  } else {
    res.status(403).json({
      error: "Something went wrong!",
    });
  }
};

const updateProfile = (req, res) => {
  updateProfileSchema
    .validate(req.body)
    .then(async (validatedData) => {
      let user = await Users.findById(req.user);
      if (user !== null) {
        user.firstName = validatedData.firstName;
        user.lastName = validatedData.lastName;
        user.save();
        res.status(200).json({
          message: "Profile data updated successfully!",
        });
      } else {
        res.status(404).json({
          error: "User account not found!",
        });
      }
    })
    .catch((error) => {
      res.status(422).json({
        error: error.errors[0],
      });
    });
};

const updatePassword = async (req, res) => {
  updatePasswordSchema
    .validate(req.body)
    .then(async (validatedData) => {
      let user = await Users.findById(req.user._id);
      if (user !== null) {
        user.password = req.password;
        user.save();
        res.status(200).json({
          success: "Password updated successfully!",
        });
      } else {
        res.status(404).json({
          error: "Invalid user",
        });
      }
    })
    .catch((error) => {
      res.status(422).json({
        error: error.errors[0],
      });
    });
};
module.exports = {
  login,
  register,
  resetPassword,
  createPassword,
  myProfile,
  updateProfile,
  updatePassword,
};
