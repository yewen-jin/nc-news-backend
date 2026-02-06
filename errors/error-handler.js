exports.genericErrorHandler = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Error" });
};

exports.invalidPathsHandler = (req, res, next) => {
  res.status(404).send({ msg: "Path not found!" });
};
