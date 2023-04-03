const yup = require("yup");

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const singupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const resetPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const createPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  otp: yup.number().required(),
});

const updatePasswordSchema = yup.object().shape({
  password: yup.string().required(),
});

const updateProfileSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

module.exports = {
  loginSchema,
  singupSchema,
  resetPasswordSchema,
  createPasswordSchema,
  updatePasswordSchema,
  updateProfileSchema,
};
