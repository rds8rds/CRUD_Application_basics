const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    // to extract token from bearer token
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "SECRET");
    req.user = decode;
    next();
  } catch (error) {
    res.json({
      message: "Authenticaton failed",
      error,
    });
  }
};

module.exports = authenticate;
