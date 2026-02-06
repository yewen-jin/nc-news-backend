const {
  deleteCommentById: deleteCommentByIdService,
} = require("../services/comments-services");
const InvalidInputError = require("../errors/invalid-input-error");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  return deleteCommentByIdService(comment_id).then(() => {
    res.status(204).send();
  });
};
