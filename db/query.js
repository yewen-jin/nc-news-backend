const db = require("./connection");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then(({ rows: users }) => {
    console.log("users: ", users);
    db.end();
  });
};

getUsers();
