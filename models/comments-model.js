const db = require("../db/connection");

exports.fetchCommentById = (commentId) => {
  return db
    .query("SELECT * FROM comments WHERE comment_id = $1;", [commentId])
    .then(({ rows }) => {
      // console.log(rows[0]);
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
