const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("colors");

// apply middle wares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

/* Welcome Route */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

/* Imports routers */
const userRouter = require("./routes/user.route");
const serviceRouter = require("./routes/service.route");
const instrumentRouter = require("./routes/instrument.route");

/* Routes */

/*  user route */
app.use("/api/users", userRouter);

/* service route */
app.use("/api/services", serviceRouter);

/* instrument route */
app.use("/api/instruments", instrumentRouter);



module.exports = app;
