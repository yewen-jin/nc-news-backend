const NotFoundError = require("./errors/not-found-error");
const InvalidInputError = require("./errors/invalid-input-error");

exports.errorHandlers = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
        res.status(404).send({ msg: err.message });
    } else if (err instanceof InvalidInputError) {
        res.status(400).send({ msg: err.message });
    } else {
        next(err);
    }
};

exports.internalErrorHandler = (err, req, res, next) => {
    console.log("internal error: ", err);
    res.status(500).send({ msg: "Internal Error" });
};

exports.invalidPathsHandler = (req, res, next) => {
    res.status(404).send({ msg: "Path not found!" });
};

exports.invalidMethodsHandler = (req, res, next) => {
    res.status(405).send({ msg: "Invalid Methods!" });
};
