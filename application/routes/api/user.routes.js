const express = require("express");

const Controller = require("../../controllers/user.controller");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const MulterMiddleware = require("../../middlewares/multer.middleware");

let router = express.Router();

router.get(
  "/authenticated",
  AuthMiddleware.authenticate(),
  Controller.getAuthenticatedUser
);
router.get("/:slug", Controller.getUser);

router.post("/", Controller.create);

router.put(
  "/",
  AuthMiddleware.authenticate(),
  MulterMiddleware.array("file"),
  Controller.update
);

module.exports = router;
