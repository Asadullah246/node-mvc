const app = require("./app");
const { connectDB } = require("./config/database");
const port = process.env.PORT || 5000;

/*  database connection */
connectDB();

/* Listen to port */
app.listen(port, () => {
  console.log(`Listening to port ${port}`.blue.bold);
});

/* 404 Route */
app.get("*", (req, res) => {
  res.send({
    message: "404 Not Found",
    success: false,
  });
});

/* Handle Global Handlers */
app.use((err, req, res, next) => {
  if (req.headersSent) {
    return next(err);
  }
  console.log(err);
  res.status(500).send({
    message: err.message,
    success: false,
  });
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server and exit process
  app.close(() => process.exit(1));
});
