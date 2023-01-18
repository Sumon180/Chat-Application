// external import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal import
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/userRouter");
const inboxRouter = require("./router/inboxRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

const port = process.env.PORT || 7070;

// database connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("database connected successfully!"))
  .catch((error) => console.log(error));

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRETE));

// routin page
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 not found error handler
app.use(notFoundHandler);
// common error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
