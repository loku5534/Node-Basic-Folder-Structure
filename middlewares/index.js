const jwt = require("jsonwebtoken");
/**
 * JWT Verify Token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
function verifyToken(req, res, next) {
  // Get authorization header from request
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No authorization header provided" });
  }

  // Get token from authorization header
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  console.log(process.env.ACCESS_TOKEN_SECRET);
  // Verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}
module.exports = {
  verifyToken,
};
