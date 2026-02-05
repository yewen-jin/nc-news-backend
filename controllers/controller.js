exports.handleInvalidMethods = (req, res, next) => {
  res.status(405).send({ msg: "Invalid Methods!" });
};
