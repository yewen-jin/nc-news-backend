const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  getCommentsByArticleId: getCommentsByArticleIdService,
  postComment: postCommentService,
  patchArticleById: patchArticleByIdService,
} = require("../services/articles-services");
const InvalidInputError = require("../errors/invalid-input-error");

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
      // console.log("controller error: ", err);
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const updates = req.body;
  if (typeof updates !== "object" || Array.isArray(updates)) {
    throw new InvalidInputError("Input needs to be an object");
  } else if (updates.inc_votes === undefined) {
    throw new InvalidInputError("Need to includ 'inc_votes' in input");
  }
  // console.log(updates);
  return patchArticleByIdService(article_id, updates)
    .then((updatedArticle) => {
      // console.log({ updatedArticle });
      res.status(200).send({ updatedArticle });
    })
    .catch((err) => {
      // console.log("controller level error");
      next(err);
    });
};
