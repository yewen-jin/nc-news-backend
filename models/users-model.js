const db = require("../db/connection");
const NotFoundError = require("../errors/not-found-error");

exports.fetchAllUsers = () => {
  return db.query("SELECT * FROM users;").then(({ rows }) => rows);
};

exports.fetchUserByUsername = (username) => {
  return db
    .query("SELECT * FROM users WHERE username = $1;", [username])
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new NotFoundError("The user doesn't exist");
      } else {
        return rows[0];
      }
    });
};
