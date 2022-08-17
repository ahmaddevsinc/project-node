import {
  body,
  param
} from "express-validator";

export const signinUserValidationRules = () => {
  return [
    // username must be an email
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password").isLength({ min: 2 }),
  ];
};

export const signupUserValidationRules = () => {
  return [
    // name not be empty
    body("name").notEmpty(),
    // username must be an email
    body("email").notEmpty().isEmail(),
    // password must be at least 5 chars long
    body("password").notEmpty().isLength({ min: 8 }),
  ];
};

export const createPostValidationRules = () => {
  return [
    // description  can not be empty
    body("description").notEmpty(),
    // title  can not be empty
    body("title").notEmpty(),
  ];
};

export const updatePostValidationRules = () => {
  return [
    // description  can not be empty
    body("description").notEmpty(),
    // title  can not be empty
    body("title").notEmpty(),
    // postId  can not be empty
    param("id").notEmpty(),
  ];
};

export const deletePostValidationRules = () => {
  return [
    // postId  can not be empty
    param("id").notEmpty(),
  ];
};

export const createCommentValidationRules = () => {
  return [
    // userId can not be empty
    body("userId").notEmpty(),
    // text  can not be empty
    body("text").notEmpty(),
    // postId  can not be empty
    body("postId").notEmpty(),
  ];
};

export const getCommentByPostIdValidationRules = () => {
  return [
    // postId can not be empty
    param("id").notEmpty(),
  ];
};

export const updateCommentValidationRules = () => {
  return [
    // commentId can not be empty
    param("id").notEmpty(),
    // userId  can not be empty
    body("userId").notEmpty(),
    // text  can not be empty
    body("text").notEmpty(),
  ];
};

export const deleteCommentValidationRules = () => {
  return [
    // commentId can not be empty
    param("id").notEmpty(),
    // userId can not be empty
    body("userId").notEmpty(),
  ];
};
