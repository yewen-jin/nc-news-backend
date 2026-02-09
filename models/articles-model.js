const db = require("../db/connection");
const InvalidInputError = require("../errors/invalid-input-error");

exports.fetchAllArticles = (sort_by = "created_at", order = "desc", topic) => {
  const validSortColumn = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
  ];
  const validOrders = ["asc", "desc"];

  if (!validSortColumn.includes(sort_by.toLowerCase())) {
    throw new InvalidInputError(
      `Invalid query input. Valid input for "sort_by" includes: author, title, article_id, topic, created_at, and votes`,
    );
  } else if (!validOrders.includes(order.toLowerCase())) {
    throw new InvalidInputError(
      `Invalid query input. Valid input for "order" should be either "asc or "desc"`,
    );
  } else {
    const queryVariables = [];

    let query = `SELECT 
        articles.author, 
        articles.title, 
        articles.article_id, 
        articles.topic, 
        articles.created_at, 
        articles.votes, 
        articles.article_img_url, 
        COUNT(comments.comment_id)::INT AS comment_count 
      FROM articles 
      LEFT JOIN comments 
      ON articles.article_id = comments.article_id 
      `;

    if (topic !== undefined) {
      query += `WHERE articles.topic = $1 
      `;
      queryVariables.push(topic);
    }

    query += `GROUP BY articles.article_id 
      ORDER BY ${sort_by} ${order};`;
    // console.log("query: ", query);
    // console.log("query variables: ", queryVariables);
    return db.query(query, queryVariables).then(({ rows }) => rows);
  }
};

exports.fetchArticleById = (articleId) => {
  return db
    .query(
      // `SELECT * FROM articles WHERE article_id = $1;`, [articleId])
      `SELECT 
        articles.author, 
        articles.title, 
        articles.body,
        articles.article_id, 
        articles.topic, 
        articles.created_at, 
        articles.votes, 
        articles.article_img_url, 
        COUNT(comments.comment_id)::INT AS comment_count 
      FROM articles 
      LEFT JOIN comments 
      ON articles.article_id = comments.article_id 
      WHERE articles.article_id = $1
      GROUP BY articles.article_id;`,
      [articleId],
    )
    .then(({ rows }) => rows[0]);
};

exports.fetchCommentsByArticleId = (articleId) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`,
      [articleId],
    )
    .then(({ rows }) => rows);
};

exports.insertComment = (articleId, newComment) => {
  return db
    .query(
      `INSERT INTO comments(article_id, author, body) VALUES($1, $2, $3) RETURNING*;`,
      [articleId, newComment.username, newComment.body],
    )
    .then(({ rows }) => rows[0]);
};

exports.updateArticle = (articleId, updates) => {
  return db
    .query(`SELECT votes FROM articles WHERE article_id = $1;`, [articleId])
    .then(({ rows }) => {
      return rows[0].votes; //if article id is invalid, this will generate error
    })
    .then((existingVotes) => {
      const newVote = existingVotes + updates.inc_votes;
      return db
        .query(
          `UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;`,
          [newVote, articleId],
        )
        .then(({ rows }) => {
          return rows[0];
        });
    });
};

exports.checkIfArticleExists = (articleId) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
    .then(({ rows }) => {
      return rows.length === 1;
    });
};

exports.checkIfTopicExists = (topic) => {
  return db
    .query(`SELECT * FROM topics WHERE slug = $1`, [topic])
    .then(({ rows }) => {
      return rows.length === 1;
    });
};
