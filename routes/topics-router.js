const express = require("express");
const { getAllTopics } = require("../controllers/topics-controller");
const {
    invalidMethodsHandler,
} = require("../controllers/error-handling-controller");

const router = express.Router();

router.route("/").get(getAllTopics).all(invalidMethodsHandler);
// router.get("/:topic_id", getTopicById);

module.exports = router;
