const Repair = require("../models/repairs.models");
const User = require("../models/users.models");
const catchAsync = require("../utils/catchAsync");

exports.findAllRepairs = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: ["pending", "completed"],
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password", "status", "role"],
        },
      },
    ],
  });

  res.status(200).json({
    status: "success",
    message: "The query has been done successfully",
    results: repairs.length,
    repairs,
  });
});

exports.createRepair = catchAsync(async (req, res) => {
  const { sessionUser } = req;
  const { date, description, motorsNumber } = req.body;

  const repair = await Repair.create({
    date,
    userId: sessionUser.id,
    description,
    motorsNumber,
  });

  return res.json({
    status: "success",
    message: "The repair has been created",
    repair,
  });
});

exports.findOneRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  res.status(200).json({
    status: "success",
    repair,
  });
});

exports.updateRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({
    status: "completed",
  });

  return res.json({
    status: "success",
    message: "The repair has been updated",
    repair,
  });
});

exports.deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  const { id } = req.params;

  await repair.update({
    status: "canceled",
  });

  res.status(200).json({
    status: "success",
    message: `Repair ${id} delete successfully`,
  });
});
