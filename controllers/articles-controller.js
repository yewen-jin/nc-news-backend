const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
} = require("../services/articles-services");

exports.getAllArticles = (req, res) => {
  return getAllArticlesService().then((articles) => {
    res.status(200).send({ articles });
  });
};

exports.getArticleById = (req, res) => {
  const { article_id } = req.params;
  return getArticleByIdService(article_id).then((article) => {
    if (article !== undefined) res.status(200).send({ article });
    else res.status(404).send({ message: "article not found!" });
  });
};
