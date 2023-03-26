const express = require("express");
const fs = require("fs");
const repairsController = require("../controllers/repairs.controller");
const repairsMiddleware = require("../middlewares/repairs.middlewares");
const usersMiddleware = require("../middlewares/users.middlewares");

const router = express.Router();

router
  .route("/")
  .get(repairsController.findAllRepairs)
  .post(
    usersMiddleware.validExistUser,
    repairsMiddleware.validRepair,
    repairsController.createRepair
  );

router
  .route("/:id")
  .get(repairsMiddleware.validExistRepair, repairsController.findOneRepair)
  .patch(
    usersMiddleware.validExistUser,
    repairsMiddleware.validRepair,
    repairsMiddleware.validExistRepair,
    repairsController.updateRepair
  )
  .delete(repairsMiddleware.validExistRepair, repairsController.deleteRepair);

module.exports = router;
