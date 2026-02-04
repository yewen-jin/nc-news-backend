const express = require("express");
const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
} = require("../controllers/articles-controller");

const router = express.Router();

router.get("/", getAllArticles);
router.get("/:article_id", getArticleById);
router.get("/:article_id/comments", getCommentsByArticleId);

module.exports = router;
