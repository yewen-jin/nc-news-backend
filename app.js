const topicsRouter = require("./routes/topics-routes");
const articlesRouter = require("./routes/articles-routes");
const usersRouter = require("./routes/users-routes");
const commentsRouter = require("./routes/comments-routes");
const NotFoundError = require("./errors/not-found-error");

const express = require("express");
const { errorMonitor } = require("supertest/lib/test");
const app = express();

app.use(express.json());

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

//error handling middleware functions
app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    console.log("404 error: ", err);
    res.status(404).send({ msg: err.message });
  } else {
    console.log("500 error: ", err);
    res.status(500).send({ msg: "internal error" });
  }
});

module.exports = app;
