const express = require("express");
const {
  getAllUsers,
  getUserByUsername,
} = require("../controllers/users-controller");
const { invalidMethodsHandler } = require("../errors/error-handler");
const router = express.Router();

router.route("/").get(getAllUsers).all(invalidMethodsHandler);

router.route("/:username").get(getUserByUsername).all(invalidMethodsHandler);

module.exports = router;
