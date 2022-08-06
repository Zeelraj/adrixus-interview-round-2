const express = require("express");
require("dotenv").config();
// Morgan is for the Logs on the Console
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// import all routes here
const auth = require("./routes/auth");
const user = require("./routes/user");

const app = express();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies and file middleware
app.use(cookieParser());

// Allows Different Servers to access routes - Enable CORS
app.use(function (req, res, next) {
  header = req.headers.origin || "http://localhost:3000";
  console.log(`Header: ${header}`);
  res.setHeader("Access-Control-Allow-Origin", header);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// morgan middleware
app.use(morgan("tiny"));

// router middleware
app.use("/api/v1", auth);
app.use("/api/v1", user);

app.get("/test", (req, res) => {
  const { text } = req.query;

  if (text) {
    return res.status(200).json({
      success: true,
      text,
      message: "This is a test Route",
    });
  }

  res.status(200).json({
    success: true,
    message: "This is a test Route",
  });
});

// export app js
module.exports = app;
