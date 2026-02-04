const {
  fetchAllArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
} = require("../models/articles-model");

exports.getAllArticles = () => fetchAllArticles();
exports.getArticleById = (articleId) => fetchArticleById(articleId);
exports.getCommentsByArticleId = (articleId) =>
  fetchCommentsByArticleId(articleId);
