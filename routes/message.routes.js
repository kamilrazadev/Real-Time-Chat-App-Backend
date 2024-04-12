const express = require("express");
const {
  getMessage,
  sendMessage,
} = require("../controllers/message.controller.js");
const protectRoute = require("../middlewares/protectRoute.js");

const router = express.Router();

router.post("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

module.exports = router;
