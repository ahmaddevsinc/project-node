import express from "express";
import {
  addComment,
  deleteComment,
  getComment,
  getCommentByPostId,
  updateComment,
} from "../Controllers/CommentController.js";
import { isAuthenticated } from "../Middlewares/UserAuthentication.js";
import { validate } from "../Middlewares/Validation.js";
import {
  createCommentValidationRules,
  deleteCommentValidationRules,
  getCommentByPostIdValidationRules,
  updateCommentValidationRules,
} from "../Middlewares/ValidationRules.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  createCommentValidationRules(),
  validate,
  addComment
);

// fetch all comments
router.get("/", isAuthenticated, getComment);

// fetch comments for specific posts
router.get(
  `/:id`,
  isAuthenticated,
  getCommentByPostIdValidationRules(),
  validate,
  getCommentByPostId
);

router.put(
  "/:id",
  isAuthenticated,
  updateCommentValidationRules(),
  validate,
  updateComment
);

router.delete(
  "/:id",
  isAuthenticated,
  deleteCommentValidationRules(),
  validate,
  deleteComment
);

export default router;
