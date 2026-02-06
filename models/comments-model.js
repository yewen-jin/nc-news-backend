const db = require("../db/connection");

exports.deleteComment = (commentId) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      commentId,
    ])
    .then(({ rows }) => {
      return rows[0];
    });
};
