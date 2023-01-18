const express = require("express");
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/usersValidators");
const router = express.Router();

router.get("/", decorateHtmlResponse("Users"), checkLogin, getUsers);

// add users
router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", removeUser);

module.exports = router;
