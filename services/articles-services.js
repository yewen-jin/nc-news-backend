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
      // console.log("article does not exist");
      throw new NotFoundError("Article does not exist");
    } else {
      // if the article id is tested to be valid, we can then use the valid user id to fetch the comments, and regardless of if there are comments, we show it as it is
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
      // console.log("error with posting comments:", err);
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
      console.log("get updated articles: ", updatedArticle);
      return updatedArticle;
    })
    .catch((err) => {
      // if (err.code === "23503") {
      throw new NotFoundError("Article Not Found!");
      // } else {
      // throw new Error("Comments are not posted");
      // }
    });
};
