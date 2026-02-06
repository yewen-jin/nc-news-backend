const db = require("../db/connection");

exports.fetchAllArticles = () => {
  return db
    .query(
      "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;",
    )
    .then(({ rows }) => rows);
};

exports.fetchArticleById = (articleId) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [articleId])
    .then(({ rows }) => rows[0]);
};

exports.fetchCommentsByArticleId = (articleId) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;",
      [articleId],
    )
    .then(({ rows }) => rows);
};

exports.insertComment = (articleId, newComment) => {
  try {
    return db
      .query(
        "INSERT INTO comments(article_id, author, body) VALUES($1, $2, $3) RETURNING*;",
        [articleId, newComment.username, newComment.body],
      )
      .then(({ rows }) => rows[0]);
  } catch {
    return { err: "insert comment error" };
  }
};
