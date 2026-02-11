const InvalidInputError = require("../errors/invalid-input-error");
const NotFoundError = require("../errors/not-found-error");
const {
  fetchAllArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  insertComment,
  checkIfArticleExists,
  updateArticle,
  checkIfTopicExists,
  insertArticle,
} = require("../models/articles-model");

exports.getAllArticles = (sort_by, order, topic) => {
  if (!topic) {
    return fetchAllArticles(sort_by, order).then((sortedList) => {
      return sortedList;
    });
  } else {
    return checkIfTopicExists(topic).then((articleExists) => {
      if (!articleExists) {
        throw new NotFoundError("Topic does not exist!");
      } else {
        return fetchAllArticles(sort_by, order, topic).then((sortedList) => {
          return sortedList;
        });
      }
    });
  }
};

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

exports.patchArticleById = (articleId, newVote) => {
  return updateArticle(articleId, newVote).then((updatedArticle) => {
    return updatedArticle;
  });
};

exports.postArticle = () => {
  return insertArticle();
};
