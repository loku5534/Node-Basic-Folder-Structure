//JSON Token
const jwt = require("jsonwebtoken");

//Access Token
const generateAccessToken = (user) => {
  const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY_TIME,
  });
  console.log(token, user);
  return token;
};

//Refresh Token
const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    user.toJSON(),
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY_TIME,
    }
  );
  return refreshToken;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
