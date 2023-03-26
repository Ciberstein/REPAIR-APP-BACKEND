const User = require("../models/users.models");

exports.validUser = (req, res, next) => {
  const { name, email, password, role, status } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "error",
      message: "the name is required",
    });
  }

  if (!email) {
    return res.status(400).json({
      status: "error",
      message: "the email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      status: "error",
      message: "the password is required",
    });
  }

  if (!role) {
    return res.status(400).json({
      status: "error",
      message: "the role is required",
    });
  }

  if (!status) {
    return res.status(400).json({
      status: "error",
      message: "the status is required",
    });
  }

  next();
};

exports.validUserUpdate = (req, res, next) => {
  const { name, email } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "error",
      message: "the name is required",
    });
  }

  if (!email) {
    return res.status(400).json({
      status: "error",
      message: "the email is required",
    });
  }

  next();
};

exports.validExistUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: "available",
    },
  });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: `User with id: ${id} not found`,
    });
  }

  req.user = user;
  next();
};
