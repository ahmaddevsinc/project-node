import express from "express";
import { addUser, signInUser } from "../Controllers/UserController.js";
import { validate } from "../Middlewares/Validation.js";
import {
  signinUserValidationRules,
  signupUserValidationRules,
} from "../Middlewares/ValidationRules.js";

const router = express.Router();

router.post("/signup", signupUserValidationRules(), validate, addUser);

router.post("/signin", signinUserValidationRules(), validate, signInUser);

export default router;
