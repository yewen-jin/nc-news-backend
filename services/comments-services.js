const { fetchAllComments, deleteComment } = require("../models/comments-model");

exports.deleteCommentById = (commentId) => {
  return deleteComment(commentId)
    .then((deletedComment) => {
      console.log("deleted comment:", deletedComment);
    })
    .catch((err) => {
      console.log("error deleting comments: ", err);
      throw new Error("comments not deleted");
    });
};
