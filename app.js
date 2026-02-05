const topicsRouter = require("./routes/topics-routes");
const articlesRouter = require("./routes/articles-routes");
const usersRouter = require("./routes/users-routes");
const commentsRouter = require("./routes/comments-routes");
const NotFoundError = require("./errors/not-found-error");

const express = require("express");
const { errorMonitor } = require("supertest/lib/test");
const app = express();

app.use(express.json());

// VALID PATHS
// The middleware chain only go into any of these if the endpoint matches the argument string
app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

// INVALID PATHS
// Errors in the previous function wouldn't go into this catch app path function because next(err) contains one argument, and it will go to the next middleware function that has 4 arguments, whereas this one has 3
app.all("/*path", (req, res, next) => {
  res.status(404).send({ msg: "Path not found!" });
});

// Error handling middleware functions
// if there are any errors in the middle of the above functions, using next(err) will pass the err object into the next middleware function
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
