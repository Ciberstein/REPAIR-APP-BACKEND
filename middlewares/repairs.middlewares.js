const Repair = require("../models/repairs.models");

exports.validRepair = (req, res, next) => {
  const { status, userId } = req.body;

  if (!status) {
    return res.status(400).json({
      status: "error",
      message: "the status is required",
    });
  }

  if (!userId) {
    return res.status(400).json({
      status: "error",
      message: "the user ID is required",
    });
  }

  next();
};

exports.validExistRepair = async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: "pending",
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: "error",
      message: `Element with id: ${id} not found`,
    });
  }

  req.repair = repair;
  next();
};
