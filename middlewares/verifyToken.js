// Middleware to check weather the user is authenticated or not.

require('dotenv').config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const token = req.cookies.access_token

  // checks weather the token exist or not
  if (!token) {
    return res.status(403).send("Please login to access this API");
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);       // verifies the token
    req.user = decoded.user_id
  } catch (error) {
    return res.status(401).send("Invalid Token");             
  }
  return next();
};

module.exports = verifyToken;