const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const repairsRoutes = require("./routes/repairs.routes");

const usersRoutes = require("./routes/users.routes");

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

app.use("/api/v1/repairs", repairsRoutes);

app.use("/api/v1/users", usersRoutes);

module.exports = app;
