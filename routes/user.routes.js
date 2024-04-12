const express = require("express");
const protectRoute = require("../middlewares/protectRoute.js");
const { getAllUsers } = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/get-all-users", protectRoute, getAllUsers);

module.exports = router;
