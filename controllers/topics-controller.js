const {
  getAllTopics: getAllTopicsService,
} = require("../services/topics-services");

//controller functions are the method that goes in the .get method
exports.getAllTopics = (req, res) => {
  return getAllTopicsService().then((topics) => {
    res.status(200).send({ topics });
  });
};
