const express = require("express");
const fs = require("fs");
const usersController = require("../controllers/users.controller");
const usersMiddleware = require("../middlewares/users.middlewares");

const router = express.Router();

router
  .route("/")
  .get(usersController.findAllUsers)
  .post(usersMiddleware.validUser, usersController.createUser);

router
  .route("/:id")
  .get(usersMiddleware.validExistUser, usersController.findOneUser)
  .patch(
    usersMiddleware.validUser,
    usersMiddleware.validExistUser,
    usersController.updateUser
  )
  .delete(usersMiddleware.validExistUser, usersController.deleteUser);

module.exports = router;
