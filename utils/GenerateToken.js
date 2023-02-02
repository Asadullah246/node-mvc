const jwt = require("jsonwebtoken");
/* generate token with refresh token */
const generateToken = (user) => {
  const payload = {
    user: {
      _id: user._id,
      name: user?.name,
      email: user?.email
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = generateToken;
