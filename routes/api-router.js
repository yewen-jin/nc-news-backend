const express = require("express");
const topicsRouter = require("./topics-router");
const articlesRouter = require("./articles-router");
const usersRouter = require("./users-router");
const commentsRouter = require("./comments-router");

const apiRouter = express.Router();

apiRouter.use("/", express.static("public"));
// VALID PATHS
// The middleware chain only go into any of these if the endpoint matches the argument string
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
