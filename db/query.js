const db = require("./connection");
const path = require("path");
const fs = require("node:fs/promises");

const getUsers = () => {
  return db
    .query("SELECT * FROM users;")
    .then(({ rows: users }) => {
      // console.log("users: ", users);
      const usersStr = JSON.stringify(users);
      fs.writeFile(__dirname + "/fetched-data/users.json", usersStr).then(
        () => {
          console.log("user file written");
        },
      );
    })
    .catch((err) => {
      console.log("caught error:", err);
    });
};

const getCodingArticles = () => {
  return db
    .query("SELECT title, topic FROM articles WHERE articles.topic = 'coding';")
    .then(({ rows: articles }) => {
      //   console.log("articles with topic of coding: ", articles);
      const articlesStr = JSON.stringify(articles);
      fs.writeFile(
        __dirname + "/fetched-data/coding-articles.json",
        articlesStr,
      ).then(() => {
        console.log("article file written");
      });
    })
    .catch((err) => {
      console.log("caught error:", err);
    });
};

const getNegativeVotesComments = () => {
  return db
    .query("SELECT body, votes FROM comments WHERE votes < 0;")
    .then(({ rows: comments }) => {
      //   console.log("comments with negative votes: ", comments);
      const commentsStr = JSON.stringify(comments);
      fs.writeFile(
        __dirname + "/fetched-data/negative-votes-comments.json",
        commentsStr,
      ).then(() => {
        console.log("negative comment file written");
      });
    })
    .catch((err) => {
      console.log("caught error:", err);
    });
};

const getTopics = () => {
  return db
    .query("SELECT * FROM topics;")
    .then(({ rows: topics }) => {
      //   console.log("topics: ", topics);
      const topicsStr = JSON.stringify(topics);
      fs.writeFile(__dirname + "/fetched-data/topics.json", topicsStr).then(
        () => {
          console.log("topic file written");
        },
      );
    })
    .catch((err) => {
      console.log("caught error:", err);
    });
};

const getArticlesByUser = (user) => {
  return db
    .query(`SELECT title, body, author FROM articles where author = '${user}';`)
    .then(({ rows: articles }) => {
      //   console.log("articles written by: ", user, "\n", articles);
      const articlesStr = JSON.stringify(articles);
      fs.writeFile(
        __dirname + `/fetched-data/articles-by-${user}.json`,
        articlesStr,
      ).then(() => {
        console.log("article by name file written");
      });
    })
    .catch((err) => {
      console.log("caught error:", err);
    });
};

const getCommentsAboveVotes = (num) => {
  return db
    .query(`SELECT body, votes, article_id FROM comments WHERE votes > ${num};`)
    .then(({ rows: comments }) => {
      //   console.log("comments with votes above: ", num, "\n", comments);
      const commentsStr = JSON.stringify(comments);
      fs.writeFile(
        __dirname + `/fetched-data/comments-above-${num}-votes.json`,
        commentsStr,
      ).then(() => {
        console.log("comment above number file written");
      });
    })
    .catch((err) => {
      console.log("caught error:", err);
    });
};

getUsers();
getCodingArticles();
getNegativeVotesComments();
getTopics();
getArticlesByUser("grumpy19");
getCommentsAboveVotes(10);

db.end();
