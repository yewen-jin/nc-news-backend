const {
  getAllUsers: getAllUsersService,
  getUserByUsername: getUserByUsernameService,
} = require("../services/users-services");

exports.getAllUsers = (req, res) => {
  return getAllUsersService().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getUserByUsername = (req, res) => {
  const { username } = req.params;
  return getUserByUsernameService(username).then((user) => {
    res.status(200).send({ user });
  });
};
