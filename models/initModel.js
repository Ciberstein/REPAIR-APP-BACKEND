const User = require("../models/users.models");
const Repair = require("../models/repairs.models");

const initModel = () => {
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = initModel;
