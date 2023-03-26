const { DataTypes } = require("sequelize");
const { db } = require("./../database/config");

const Repair = db.define("Repairs", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "canceled"),
    defaultValue: "pending",
    allowNull: false,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

module.exports = Repair;
