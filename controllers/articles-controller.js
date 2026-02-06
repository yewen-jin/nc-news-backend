const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  getCommentsByArticleId: getCommentsByArticleIdService,
  postComment: postCommentService,
  patchArticleById: patchArticleByIdService,
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
      // console.log("error in controller: ", err);
      // res.status(404).send({ msg: err.message });
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  return getCommentsByArticleIdService(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  return postCommentService(article_id, newComment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      console.log("controller error: ", err);
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const updates = req.body;
  return patchArticleByIdService(article_id, updates)
    .then((updatedContent) => {
      res.status(201).send({ updatedContent });
    })
    .catch((err) => {
      next(err);
    });
};
