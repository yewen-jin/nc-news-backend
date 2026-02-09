const { fetchAllUsers, fetchUserByUsername } = require("../models/users-model");

exports.getAllUsers = () => {
  return fetchAllUsers();
};

exports.getUserByUsername = (username) => {
  return fetchUserByUsername(username);
};
