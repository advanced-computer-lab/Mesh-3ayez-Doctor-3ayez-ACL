const jwt = require("jsonwebtoken");
const dotenv=require('dotenv');
dotenv.config({path:__dirname+'/../../../config/.env'});

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authentication-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
   
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;