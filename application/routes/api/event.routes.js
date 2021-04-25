const express = require("express");

const Controller = require("../../controllers/event.controller");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const MulterMiddleware = require("../../middlewares/multer.middleware");

const router = express.Router();

router.get("/", AuthMiddleware.authenticate(), Controller.getUserEvents);
router.get("/:slug", AuthMiddleware.authenticate(false), Controller.getOne);
router.get("/:eventSlug/:slotSlug", Controller.getSlot);
router.post("/list", Controller.getList);
router.post("/enrollment", Controller.createEnrollment);
router.post(
  "/",
  AuthMiddleware.authenticate(),
  MulterMiddleware.single("file"),
  Controller.create
);
router.put(
  "/",
  AuthMiddleware.authenticate(),
  MulterMiddleware.single("file"),
  Controller.update
);
router.delete("/:id", AuthMiddleware.authenticate(), Controller.removeById);

module.exports = router;
