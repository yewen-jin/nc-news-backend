const {
  getAllUsers: getAllUsersService,
} = require("../services/users-services");

exports.getAllUsers = (req, res) => {
  return getAllUsersService().then((users) => {
    res.status(200).send({ users });
  });
};
