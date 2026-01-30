const db = require("../connection");
const format = require("pg-format");
const { createLookupObj } = require("../../utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query("DROP TABLE IF EXISTS comments;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS emoji_article_user;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS emojis;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS ascii_animals;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS user_topic");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS user_article_votes");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS articles;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS topics;");
    })
    .then(() => {
      return db.query(
        "CREATE TABLE topics(\n slug VARCHAR(20) PRIMARY KEY,\n description VARCHAR(300) NOT NULL, \n img_url VARCHAR(1000) \n );",
      );
    })
    .then(() => {
      return db.query(
        "CREATE TABLE users(\n username VARCHAR(20) PRIMARY KEY, \n name VARCHAR(40) NOT NULL, \n avatar_url VARCHAR(1000) \n);",
      );
    })
    .then(() => {
      return db.query(
        "CREATE TABLE articles(\n article_id SERIAL PRIMARY KEY, \n title VARCHAR(300) NOT NULL, \n topic VARCHAR(20) NOT NULL, \n author VARCHAR(20) NOT NULL, \n body TEXT NOT NULL, \n created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \n votes INT DEFAULT 0, \n article_img_url VARCHAR(1000), \n CONSTRAINT fk_article_topic FOREIGN KEY (topic) REFERENCES topics(slug), \n CONSTRAINT fk_article_author FOREIGN KEY (author) REFERENCES users(username) \n);",
      );
    })
    .then(() => {
      return db.query(
        "CREATE TABLE comments(\n comment_id SERIAL PRIMARY KEY, \n article_id INT NOT NULL, \n body TEXT NOT NULL, \n votes INT DEFAULT 0, \n author VARCHAR(20) NOT NULL, \n created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \n CONSTRAINT fk_article_id FOREIGN KEY (article_id) REFERENCES articles(article_id), \n CONSTRAINT fk_comment_author FOREIGN KEY (author) REFERENCES users(username) \n);",
      );
    })
    .then(() => {
      return db.query(
        "CREATE TABLE user_topic(\n user_topic_id SERIAL PRIMARY KEY, \n username VARCHAR(20) NOT NULL, \n topic VARCHAR(20) NOT NULL \n);",
      );
    })
    .then(() => {
      return db.query(
        "CREATE TABLE ascii_animals(\n animal_id SERIAL PRIMARY KEY, \n animal VARCHAR(20) NOT NULL, \n drawing TEXT NOT NULL);",
      );
    })
    .then(() => {
      return db.query(
        "CREATE TABLE emojis(\n emoji_id SERIAL PRIMARY KEY, \n emoji VARCHAR NOT NULL, \n emoji_name VARCHAR NOT NULL, \n emoji_type VARCHAR(20) \n);",
      );
    })
    .then(() => {
      return db.query(
        "CREATE TABLE emoji_article_user(\n emoji_article_user_id SERIAL PRIMARY KEY, \n emoji_id INT NOT NULL, \n username VARCHAR(20) NOT NULL, \n article_id INT NOT NULL,\n FOREIGN KEY (emoji_id) REFERENCES emojis(emoji_id), \n FOREIGN KEY (username) REFERENCES users(username), \n FOREIGN KEY (article_id) REFERENCES articles(article_id) \n);",
      );
    })
    .then(() => {
      const formattedTopics = topicData.map((topic) => {
        return [topic.slug, topic.description, topic.img_url];
      });
      const queryStr = format(
        "INSERT INTO topics(slug, description, img_url) VALUES %L",
        formattedTopics,
      );
      return db.query(queryStr);
    })
    .then(() => {
      const formattedUsers = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });
      const queryStr = format(
        "INSERT INTO users(username, name, avatar_url) VALUES %L",
        formattedUsers,
      );
      return db.query(queryStr);
    })
    .then(() => {
      const formattedArticles = articleData.map((article) => {
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          article.created_at,
          article.votes,
          article.article_img_url,
        ];
      });
      const queryStr = format(
        "INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *",
        formattedArticles,
      );
      return db.query(queryStr);
    })
    .then(({ rows: articles }) => {
      const lookupId = createLookupObj(articles, "title", "article_id");
      const formattedComments = commentData.map((comment) => {
        return [
          lookupId[comment.article_title],
          comment.body,
          comment.votes,
          comment.author,
          comment.created_at,
        ];
      });
      const queryStr = format(
        "INSERT INTO comments(article_id, body, votes, author,created_at) VALUES %L RETURNING *",
        formattedComments,
      );
      return db.query(queryStr);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

module.exports = seed;
