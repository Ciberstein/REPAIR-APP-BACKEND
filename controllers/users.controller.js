const User = require("../models/users.models");
const bcrypt = require("bcryptjs");
const generateJWT = require("../utils/jwt");
const AppError = require("../utils/appError");

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

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const repair = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
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
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

exports.updateUser = async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
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

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
      status: "available",
    },
  });

  if (!user) {
    return next(new AppError("User not found", 401));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: "error",
      message: `Incorrect email or password`,
    });
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: "success",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
