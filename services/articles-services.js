const {
  fetchAllArticles,
  fetchArticleById,
} = require("../models/articles-model");

exports.getAllArticles = () => fetchAllArticles();
exports.getArticleById = (articleId) => fetchArticleById(articleId);
