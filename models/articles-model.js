const db = require("../db/connection");

exports.fetchAllArticles = () => {
  return db.query("SELECT * FROM articles;").then(({ rows }) => rows);
};
