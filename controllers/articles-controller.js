const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  getCommentsByArticleId: getCommentsByArticleIdService,
  postComment: postCommentService,
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
  console.log(req);
  console.log("new comment: ", newComment);
  //newComment contains .username and .body properties
  return postCommentService(article_id, newComment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      console.log("error in controller:", err);
      next(err);
    });
};
