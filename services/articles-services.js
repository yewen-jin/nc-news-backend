const { fetchAllArticles } = require("../models/articles-model");

exports.getAllArticles = () => fetchAllArticles();
