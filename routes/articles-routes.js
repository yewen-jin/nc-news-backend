const express = require("express");
const { handleInvalidMethods } = require("../controllers/controller");
const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentForArticleById,
} = require("../controllers/articles-controller");

const router = express.Router();

router.route("/").get(getAllArticles).all(handleInvalidMethods);
// router.get("/", getAllArticles);
// router.delete("/", handleInvalidMethod);

router.get("/:article_id", getArticleById);

router.get("/:article_id/comments", getCommentsByArticleId);

router.post("/:article_id", postCommentForArticleById);

module.exports = router;
