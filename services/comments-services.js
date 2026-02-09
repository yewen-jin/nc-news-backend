const NotFoundError = require("../errors/not-found-error");
const { fetchCommentById, deleteComment } = require("../models/comments-model");

exports.getCommentById = (commentId) => {
  return fetchCommentById(commentId).then((fetchedComment) => {
    return fetchedComment;
  });
};

exports.deleteCommentById = (commentId) => {
  return deleteComment(commentId).then((deletedComment) => {
    if (deletedComment === undefined) {
      throw new NotFoundError("Comment doesn't exist!");
    }
  });
};
