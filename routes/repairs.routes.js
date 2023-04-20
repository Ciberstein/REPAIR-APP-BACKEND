const express = require("express");
const fs = require("fs");
const authMiddleware = require("../middlewares/auth.middleware");
const repairsController = require("../controllers/repairs.controller");
const repairsMiddleware = require("../middlewares/repairs.middlewares");

const router = express.Router();
router.use(authMiddleware.protect);
router
  .route("/")
  .get(repairsController.findAllRepairs)
  .post(repairsController.createRepair);

router
  .route("/:id")
  .get(repairsMiddleware.validExistRepair, repairsController.findOneRepair)
  .patch(repairsMiddleware.validExistRepair, repairsController.updateRepair)
  .delete(repairsMiddleware.validExistRepair, repairsController.deleteRepair);

module.exports = router;
