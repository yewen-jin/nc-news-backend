const db = require("./connection");
const path = require("path");
const fs = require("node:fs/promises");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then(({ rows: users }) => {
    console.log("users: ", users);
    const usersStr = JSON.stringify(users);
    fs.writeFile(__dirname + "/fetched-data/users.json", usersStr).then(() => {
      console.log("user file written");
    });
  });
};

const getCodingArticles = () => {
  return db
    .query("SELECT title, topic FROM articles WHERE articles.topic = 'coding';")
    .then(({ rows: articles }) => {
      console.log("articles with topic of coding: ", articles);
    });
};

const getNegativeVotesComments = () => {
  return db
    .query("SELECT body, votes FROM comments WHERE votes < 0;")
    .then(({ rows: comments }) => {
      console.log("comments with negative votes: ", comments);
    });
};

const getTopics = () => {};

const getArticlesByUser = (user) => {};

const getCommentsAboveVotes = (num) => {};

getUsers();
getCodingArticles();
getNegativeVotesComments();
getTopics();
getArticlesByUser();
getCommentsAboveVotes();

db.end();
