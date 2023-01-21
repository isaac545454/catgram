const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jsonSecret = process.env.SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ errors: ["acesso negado"] });

  try {
    const verified = jwt.verify(token, jsonSecret);

    req.user = await User.findById(verified.id).select("-password");
    next();
  } catch (error) {
    res.status(400).json({ errors: ["token invalido"] });
  }
};

module.exports = authGuard;
