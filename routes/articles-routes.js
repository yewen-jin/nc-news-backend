const express = require("express");
const { handleInvalidMethods } = require("../controllers/controller");
const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  postComment,
} = require("../controllers/articles-controller");

const router = express.Router();

router.route("/").get(getAllArticles).all(handleInvalidMethods);
// router.get("/", getAllArticles);
// router.delete("/", handleInvalidMethod);

router.route("/:article_id").get(getArticleById).all(handleInvalidMethods);

router
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postComment)
  .all(handleInvalidMethods);

module.exports = router;
