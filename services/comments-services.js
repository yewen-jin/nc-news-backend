const NotFoundError = require("../errors/not-found-error");
const {
  fetchCommentById,
  deleteComment,
  updateComment,
} = require("../models/comments-model");

exports.getCommentById = (commentId) => {
  return fetchCommentById(commentId).then((fetchedComment) => {
    return fetchedComment;
  });
};

exports.deleteCommentById = (commentId) => {
  return deleteComment(commentId);
};

exports.patchCommentById = (commentId, newVote) => {
  return updateComment(commentId, newVote).then((updatedComment) => {
    return updatedComment;
  });
};
