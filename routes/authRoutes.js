const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers");
const { verifyToken } = require("../middlewares/index");

router
  .post("/login", AuthController.login)
  .post("/register", AuthController.register)
  .post("/reset-password", AuthController.resetPassword)
  .post("/create-password", AuthController.createPassword)
  .get("/my", verifyToken, AuthController.myProfile)
  .post("/update-profile", verifyToken, AuthController.updateProfile)
  .post("/update-password", verifyToken, AuthController.updatePassword);

module.exports = router;
