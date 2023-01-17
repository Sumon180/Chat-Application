const express = require("express");
const { getLogin, login } = require("../controller/loginController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middleware/login/loginValidators");

const router = express.Router();

// page title
const page_title = "Login";

// login page
router.get("/", decorateHtmlResponse(page_title), getLogin);

// process login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

module.exports = router;
