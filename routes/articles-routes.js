const express = require("express");
const { getAllArticles } = require("../controllers/articles-controller");

const router = express.Router();

router.get("/", getAllArticles);

module.exports = router;
