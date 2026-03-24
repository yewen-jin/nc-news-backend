const {
    invalidMethodsHandler,
} = require("../controllers/error-handling-controller");
const {
    getCommentById,
    deleteCommentById,
    patchCommentById,
} = require("../controllers/comments-controller");
const express = require("express");
const router = express.Router();

router
    .route("/:comment_id")
    .get(getCommentById)
    .patch(patchCommentById)
    .delete(deleteCommentById)
    .all(invalidMethodsHandler);

module.exports = router;
