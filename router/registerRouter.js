// external imports
const express = require("express");
const { check } = require("express-validator");

// internal imports
const { addUser, removeUser } = require("../controller/registerController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

const { checkLogin, requireRole } = require("../middlewares/common/checkLogin");

const router = express.Router();

// add user
router.post(
  "/",
  decorateHtmlResponse("Register"),
  requireRole(["admin"]),
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

router.get("/", addUser);

// remove user
// router.delete("/:id", checkLogin, requireRole(["admin"]), removeUser);

module.exports = router;
