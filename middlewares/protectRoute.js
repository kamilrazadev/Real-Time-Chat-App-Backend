const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized - Not Loggedin",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        error: "Unauthorized - Invalid user",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error in protectedRoute middleware: " + error.message });
    console.log("Error in protectedRoute middleware: ", error.message);
  }
};

module.exports = protectRoute;
