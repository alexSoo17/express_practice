const express = require("express");
const app = express();

const userRouter = require("./routes/userRoutes");
const tourRouter = require("./routes/tourRoutes");

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/tours", tourRouter);

// handle unhandled routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `${req.url} is not defined on this server`,
  });
});
module.exports = app;
