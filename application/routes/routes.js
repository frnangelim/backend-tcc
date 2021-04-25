const express = require("express");

// Routes
const start = require("./api/start.routes");
const auth = require("./api/auth.routes");
const user = require("./api/user.routes");
const event = require("./api/event.routes");

let router = express.Router();

router.use("/start", start);
router.use("/auth", auth);
router.use("/user", user);
router.use("/event", event);

module.exports = router;
