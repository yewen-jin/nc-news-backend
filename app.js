const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api-router");
const {
    internalErrorHandler,
    invalidPathsHandler,
    errorHandlers,
} = require("./controllers/error-handling-controller");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", express.static("public"));
app.use("/docs", express.static("public"));
app.use("/api", apiRouter);
app.all("/*path", invalidPathsHandler);

app.use(errorHandlers);
app.use(internalErrorHandler);

module.exports = app;
