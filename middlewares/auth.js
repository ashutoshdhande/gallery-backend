const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  // if (token === undefined) token = null;

  if (!token) {
    return res.status(404).send("<h1>No token found.</h1>");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
  return next();
};
