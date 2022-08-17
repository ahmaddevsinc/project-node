import express from "express";
import {
  addPost,
  deletePost,
  getDrafts,
  getPost,
  updatePost,
} from "../Controllers/PostController.js";
import { isAuthenticated } from "../Middlewares/UserAuthentication.js";
import { validate } from "../Middlewares/Validation.js";
import {
  createPostValidationRules,
  deletePostValidationRules,
  updatePostValidationRules,
} from "../Middlewares/ValidationRules.js";

const router = express.Router();

router.post(
  "/",
  createPostValidationRules(),
  validate,
  isAuthenticated,
  addPost
);

router.get("/", isAuthenticated, getPost);

router.put(
  "/:id",
  updatePostValidationRules(),
  validate,
  isAuthenticated,
  updatePost
);

router.delete(
  "/:id",
  deletePostValidationRules(),
  validate,
  isAuthenticated,
  deletePost
);

router.get("/drafts", isAuthenticated, getDrafts);

export default router;
