const db = require("../db/connection");
const NotFoundError = require("../errors/not-found-error");

exports.fetchCommentById = (commentId) => {
  return db
    .query("SELECT * FROM comments WHERE comment_id = $1;", [commentId])
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new NotFoundError("Comment does not exist.");
      }
      return rows[0];
    });
};

exports.deleteComment = (commentId) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      commentId,
    ])
    .then(({ rows }) => {
      return rows[0];
    });
};
