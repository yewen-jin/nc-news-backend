const NotFoundError = require("../errors/not-found-error");
const {
  fetchAllArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  insertComment,
  checkIfArticleExists,
} = require("../models/articles-model");

exports.getAllArticles = () => fetchAllArticles();

exports.getArticleById = (articleId) => {
  return fetchArticleById(articleId).then((article) => {
    if (article === undefined) {
      throw new NotFoundError("Article not found!");
    } else {
      return article;
    }
  });
};

exports.getCommentsByArticleId = (articleId) => {
  return checkIfArticleExists(articleId).then((isArticleTrue) => {
    if (isArticleTrue === false) {
      console.log("article does not exist");
      throw new NotFoundError("Article does not exist");
    } else {
      return fetchCommentsByArticleId(articleId).then((comments) => {
        // if (comments.length === 0) {
        //   console.log("comments not found");
        //   throw new NotFoundError("There is no comment in this article");
        // } else {
        return comments;
        // }
      });
    }
  });
};

exports.postComment = (articleId, newComment) => {
  return insertComment(articleId, newComment)
    .then((comment) => {
      return comment;
    })
    .catch((err) => {
      console.log("service layer:", err);
      throw new NotFoundError("Article Not Found!");
    });
};

exports.patchArticleById = (articleId, updates) => {};
