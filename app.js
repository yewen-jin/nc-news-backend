const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api-router");
const NotFoundError = require("./errors/not-found-error");
const InvalidInputError = require("./errors/invalid-input-error");
const {
    genericErrorHandler,
    invalidPathsHandler,
} = require("./errors/error-handler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/docs", express.static("public"));
app.use("/api", apiRouter);
app.all("/*path", invalidPathsHandler);

app.use((err, req, res, next) => {
    if (err instanceof NotFoundError) {
        res.status(404).send({ msg: err.message });
    } else if (err instanceof InvalidInputError) {
        res.status(400).send({ msg: err.message });
    } else {
        next(err);
    }
});

app.use(genericErrorHandler);

module.exports = app;
