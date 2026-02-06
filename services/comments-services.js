const NotFoundError = require("../errors/not-found-error");
const { fetchAllComments, deleteComment } = require("../models/comments-model");

exports.deleteCommentById = (commentId) => {
  return deleteComment(commentId).then((deletedComment) => {
    if (deletedComment === undefined) {
      throw new NotFoundError("Comment doesn't exist!");
    }
  });
};
