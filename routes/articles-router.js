const express = require("express");
const { invalidMethodsHandler } = require("../errors/error-handler");
const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  postComment,
  patchArticleById,
} = require("../controllers/articles-controller");

const router = express.Router();

router.route("/").get(getAllArticles).all(invalidMethodsHandler);

router
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(invalidMethodsHandler);

router
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postComment)
  .all(invalidMethodsHandler);

module.exports = router;
