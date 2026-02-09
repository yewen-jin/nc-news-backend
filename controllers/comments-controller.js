const {
  getCommentById: getCommentByIdService,
  deleteCommentById: deleteCommentByIdService,
} = require("../services/comments-services");
const InvalidInputError = require("../errors/invalid-input-error");

exports.getCommentById = (req, res) => {
  const { comment_id } = req.params;
  return getCommentByIdService(comment_id).then((comment) => {
    res.status(200).send({ comment });
  });
};

exports.deleteCommentById = (req, res) => {
  const { comment_id } = req.params;
  return deleteCommentByIdService(comment_id).then(() => {
    res.status(204).send();
  });
};
