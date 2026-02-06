const NotFoundError = require("../errors/not-found-error");
const {
  fetchAllArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  insertComment,
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
  return fetchCommentsByArticleId(articleId).then((comments) => {
    //is there a way to check if the article doesn't exist or if it exists but doesn't have any comments?
    if ("") {
    }
    // The article_id exists but comments count is 0
    else if (comments.length === 0) {
      throw new NotFoundError("Comments not found");
    } else {
      return comments;
    }
  });
};

exports.postComment = (articleId, newComment) => {
  return insertComment(articleId, newComment).then((comment) => {
    return comment;
  });
};
