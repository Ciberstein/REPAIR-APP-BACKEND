const Repair = require("../models/repairs.models");

exports.findAllRepairs = async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: "pending",
    },
  });

  res.status(200).json({
    status: "success",
    message: "The query has been done successfully",
    results: repairs.length,
    repairs,
  });
};

exports.createRepair = async (req, res) => {
  const { status, date, userId } = req.body;

  const repair = await Repair.create({
    date,
    status,
    userId,
  });

  return res.json({
    status: "success",
    message: "The repair has been created",
    repair,
  });
};

exports.findOneRepair = async (req, res) => {
  const { repair } = req;

  res.status(200).json({
    repair,
  });
};

exports.updateRepair = async (req, res) => {
  const { repair } = req;
  const { status } = req.body;

  await repair.update({
    status,
  });

  return res.json({
    status: "success",
    message: "The repair has been updated",
    repair,
  });
};

exports.deleteRepair = async (req, res) => {
  const { repair } = req;
  const { id } = req.params;

  await repair.update({
    status: "canceled",
  });

  res.status(200).json({
    status: "success",
    message: `Repair ${id} delete successfully`,
  });
};
