const express = require("express");
const { getAllUsers } = require("../controllers/users-controller");
const { invalidMethodsHandler } = require("../errors/error-handler");
const router = express.Router();

router.route("/").get(getAllUsers).all(invalidMethodsHandler);

module.exports = router;
