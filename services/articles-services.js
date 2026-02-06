const NotFoundError = require("../errors/not-found-error");
const {
  fetchAllArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  insertComment,
  checkIfArticleExists,
  updateArticle,
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
  // first check if this article id is valid. If not, throw an error
  return checkIfArticleExists(articleId).then((isArticleIdValid) => {
    if (!isArticleIdValid) {
      throw new NotFoundError("Article does not exist");
    } else {
      // if the article id is tested to be valid, we can then use the valid user id to fetch the comments, and regardless of if there are comments, we show it as it is
      return fetchCommentsByArticleId(articleId).then((comments) => {
        return comments;
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
      if (err.code === "23503") {
        throw new NotFoundError("Article Not Found!");
      } else {
        throw new Error("Comments are not posted");
      }
    });
};

exports.patchArticleById = (articleId, updates) => {
  return updateArticle(articleId, updates)
    .then((updatedArticle) => {
      return updatedArticle;
    })
    .catch((err) => {
      // console.log("patching article error:", err);
      // if the article is not found, the first sql query which tries to return existing vote will return nothing,
      // The error is generated when trying to read votes property from undefined
      // the error is caught here
      throw new NotFoundError("Article Not Found!");
    });
};
