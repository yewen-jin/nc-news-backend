const {
  getCommentById: getCommentByIdService,
  deleteCommentById: deleteCommentByIdService,
  patchCommentById: patchCommentByIdService,
} = require("../services/comments-services");
const InvalidInputError = require("../errors/invalid-input-error");

exports.getCommentById = (req, res) => {
  const { comment_id } = req.params;
  if (Number.isNaN(Number(comment_id))) {
    throw new InvalidInputError("Invalid comment id format: must be a number");
  } else {
    return getCommentByIdService(comment_id).then((comment) => {
      res.status(200).send({ comment });
    });
  }
};

exports.deleteCommentById = (req, res) => {
  const { comment_id } = req.params;
  if (Number.isNaN(Number(comment_id))) {
    throw new InvalidInputError("Invalid comment id format: must be a number");
  } else {
    return deleteCommentByIdService(comment_id).then(() => {
      res.status(204).send();
    });
  }
};

exports.patchCommentById = (req, res) => {
  const { comment_id } = req.params;
  if (Number.isNaN(Number(comment_id))) {
    throw new InvalidInputError("Invalid comment id format: must be a number");
  } else if (
    typeof req.body !== "object" ||
    Object.getPrototypeOf(req.body) !== Object.prototype
  ) {
    throw new InvalidInputError("Input needs to be an object");
  } else if (req.body.inc_votes === undefined) {
    throw new InvalidInputError("Need to include 'inc_votes' in input");
  } else {
    const { inc_votes } = req.body;
    return patchCommentByIdService(comment_id, inc_votes).then(
      (updatedComment) => {
        res.status(200).send({ updatedComment });
      },
    );
  }
};
