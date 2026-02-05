const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  getCommentsByArticleId: getCommentsByArticleIdService,
} = require("../services/articles-services");

exports.getAllArticles = (req, res) => {
  return getAllArticlesService().then((articles) => {
    res.status(200).send({ articles });
  });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  return getArticleByIdService(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      console.log("error in controller: ", err);
      // res.status(404).send({ msg: err.message });
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res) => {
  const { article_id } = req.params;
  return getCommentsByArticleIdService(article_id).then((comments) => {
    if (comments.length === 0) {
      res.status(404).send({ message: "Comments not found" });
    } else {
      res.status(200).send({ comments });
    }
  });
};
