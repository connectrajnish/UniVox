const jwt = require("jsonwebtoken");
const User = require("../models/userProfile"); // Use your actual User model name

module.exports = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for the secret

    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = { _id: user.id };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      //Incase of expired jwt or invalid token kill the token and clear the cookie
      res.clearCookie("token");
      return res.status(401).json({ error: "Invalid token" });
    } else {
      return res.status(500).json({ error: error });
    }
  }
};
