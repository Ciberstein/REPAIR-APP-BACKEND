const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error.controller");
const repairsRoutes = require("./routes/repairs.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(cors());

app.use("/api/v1/repairs", repairsRoutes);

app.use("/api/v1/users", usersRoutes);

app.all("*", (req, res, next) => {
  return next(
    new AppError(`cannot find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);
module.exports = app;
