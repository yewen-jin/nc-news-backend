exports.genericErrorHandler = (err, req, res, next) => {
  //logging the error
  //mayebe send someone an email to alert them

  res.status(500).send({ msg: "Internal Error" });
};

exports.invalidPathsHandler = (req, res, next) => {
  res.status(404).send({ msg: "Path not found!" });
};
