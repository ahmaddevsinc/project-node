import express from "express";
import database from "../database.js";
import User from "./Routes/User.js";
import Post from "./Routes/Post.js";
import Comment from "./Routes/Comment.js";
import "dotenv/config";

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", User);
app.use("/api/posts", Post);
app.use("/api/comments", Comment);

database
  .sync({ alter: true }) // when force: true, there would be all data in all tables deleted
  .then(() => {
    app.listen(process.env.PORT || 8080);
    console.log("connected to db");
  });
