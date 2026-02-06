const NotFoundError = require("../errors/not-found-error");
const { fetchAllComments, deleteComment } = require("../models/comments-model");

exports.deleteCommentById = (commentId) => {
  return deleteComment(commentId).then((deletedComment) => {
    console.log("deleted comment:", deletedComment);
    if (deletedComment === undefined) {
      console.log("throwing not found error below");
      throw new NotFoundError("Comment doesn't exist!");
    }
  });
};
