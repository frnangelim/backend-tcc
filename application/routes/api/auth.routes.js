const express = require("express");

const Controller = require("../../controllers/auth.controller");

let router = express.Router();

router.post("/login", Controller.login);

module.exports = router;
