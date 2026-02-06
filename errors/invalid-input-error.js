class InvalidInputError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = InvalidInputError;
