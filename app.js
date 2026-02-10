const express = require("express");
const apiRouter = require("./routes/api-router");
const NotFoundError = require("./errors/not-found-error");
const InvalidInputError = require("./errors/invalid-input-error");
const {
  genericErrorHandler,
  invalidPathsHandler,
} = require("./errors/error-handler");

const app = express();

app.use(express.json());

// VALID PATHS
// The middleware chain only go into any of these if the endpoint matches the argument string
app.use("/docs", express.static("public"));
app.use("/api", apiRouter);

// INVALID PATHS
// Errors in the previous function wouldn't go into this catch app path function because next(err) contains one argument, and it will go to the next middleware function that has 4 arguments, whereas this one has 3
app.all("/*path", invalidPathsHandler);

// Error handling middleware functions
// if there are any errors in the middle of the above functions, using next(err) will pass the err object into the next middleware function
app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    // console.log("404 error: ", err);
    res.status(404).send({ msg: err.message });
  } else if (err instanceof InvalidInputError) {
    res.status(400).send({ msg: err.message });
  } else {
    next(err);
  }
});

//INTERNAL ERROR
app.use(genericErrorHandler);

module.exports = app;
