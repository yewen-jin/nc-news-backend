const express = require("express");
const { getAllTopics } = require("../controllers/topics-controller");

const router = express.Router();

router.get("/", getAllTopics);
// router.get("/:topic_id", getTopicById);

module.exports = router;
