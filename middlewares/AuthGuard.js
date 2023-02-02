const jwt = require("jsonwebtoken");

const AuthGuard = (req, res, next) => {
  const token = req.header("authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Access denied. No token provided.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded?.user;
    req.expire = decoded?.exp;
    next();
  } catch (ex) {
    res.status(400).send({
      success: false,
      message: "Invalid token.",
    });
  }
};
module.exports = AuthGuard;
