const express = require("express");
require("dotenv").config();
// Morgan is for the Logs on the Console
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// fore swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// import all routes here
const auth = require("./routes/auth");
const user = require("./routes/user");

const app = express();

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies and file middleware
app.use(cookieParser());

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
