require("dotenv").config();
const app = require("./app");
const { db } = require("./database/config");
const initModel = require("./models/initModel");

db.authenticate()
  .then(() => console.log("DB Authenticated!"))
  .catch((err) => console.log(err));

initModel();

db.sync()
  .then(() => console.log("DB Synced!"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
