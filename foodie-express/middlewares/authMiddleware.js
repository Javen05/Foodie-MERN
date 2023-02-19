const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.header("Authorization");

  if (!token) {
    return res
      .json({
        success: false,
        message: "You are not logged in",
      })
      .status(401);
  }

  token = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithm: "HS512" });
    // days * hours * minutes * seconds * milliseconds
    if (decoded.iat + (1 * 24 * 60 * 60 * 1000) >= Date.now()) {
      req.userId = decoded.sub;
    } else {
      req.userId = 0;
    }

    next();
  } catch (err) {
    return res
      .json({
        success: false,
        message: "Invalid token",
      })
      .status(401);
  }
};
