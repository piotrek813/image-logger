var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var fs = require("fs");

var indexRouter = require("./routes/index");
var logRouter = require("./routes/log");

var app = express();
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(
  morgan("combined", {
    stream: accessLogStream,
    skip: (req, res) => !req.originalUrl.startsWith("/image"),
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/image", indexRouter);
app.use("/log", logRouter);

module.exports = app;

