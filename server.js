require("dotenv").config();
const app = require("./app");
const { db } = require("./database/config");
const port = process.env.PORT || 3002;

db.authenticate()
  .then(() => console.log("DB Authenticated!"))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("DB Synced!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
