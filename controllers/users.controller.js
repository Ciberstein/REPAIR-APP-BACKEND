const User = require("../models/users.models");

exports.findAllUsers = async (req, res) => {
  const users = await User.findAll({
    where: {
      status: "available",
    },
  });

  res.status(200).json({
    status: "success",
    message: "The query has been done successfully",
    results: users.length,
    users,
  });
};

exports.createUser = async (req, res) => {
  const { name, email, password, role, status } = req.body;

  const repair = await User.create({
    name,
    email,
    password,
    role,
    status,
  });

  return res.json({
    status: "success",
    message: "The user has been created",
    repair,
  });
};

exports.findOneUser = async (req, res) => {
  const { user } = req;

  res.status(200).json({
    user,
  });
};

exports.updateUser = async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({
    name,
    email,
  });

  return res.json({
    status: "success",
    message: "The user has been updated",
  });
};

exports.deleteUser = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  await user.update({
    status: "disabled",
  });

  res.status(200).json({
    status: "success",
    message: `User with id:${id} has been delete successfully`,
  });
};
