const { invalidMethodsHandler } = require("../errors/error-handler");
const {
  getCommentById,
  deleteCommentById,
} = require("../controllers/comments-controller");
const express = require("express");
const router = express.Router();

router
  .route("/:comment_id")
  .get(getCommentById)
  .delete(deleteCommentById)
  .all(invalidMethodsHandler);

module.exports = router;
