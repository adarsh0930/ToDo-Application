const jwt = require("jsonwebtoken");
const { getUserById } = require("../models/user");

async function authorize(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).send("Access denied: Unauthorized");
    }
    req.token = token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).send("Access denied: Unauthorized");
    }

    const user = await getUserById(decoded.id);
    const istokenActive = user.tokens.includes(token);
    if (!istokenActive) {
      return res.status(403).send("Access denied: Unauthorized");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in Authorize Middleware: ", error);
    return res.status(403).send("Invalid token");
  }
}

module.exports = authorize;
