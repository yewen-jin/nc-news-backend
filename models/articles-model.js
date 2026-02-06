const db = require("../db/connection");
const NotFoundError = require("../errors/not-found-error");

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
  return db
    .query(
      "INSERT INTO comments(article_id, author, body) VALUES($1, $2, $3) RETURNING*;",
      [articleId, newComment.username, newComment.body],
    )
    .then(({ rows }) => rows[0]);
};

exports.checkIfArticleExists = (articleId) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [articleId])
    .then(({ rows }) => {
      return rows.length === 1;
    });
};

exports.updateArticle = (articleId, updates) => {
  return db
    .query("SELECT votes FROM articles WHERE article_id = $1;", [articleId])
    .then(({ rows }) => {
      return rows[0].votes; //if article id is invalid, this will generate error
    })
    .then((existingVotes) => {
      const newVote = existingVotes + updates.inc_votes;
      return db
        .query(
          "UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;",
          [newVote, articleId],
        )
        .then(({ rows }) => {
          return rows[0];
        });
    });
};
