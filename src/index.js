import express from "express";
import database from "../database.js";
import User from "./routes/User.js";
import Post from "./routes/Post.js";
import Comment from "./routes/Comment.js";

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", User);
app.use("/posts", Post);
app.use("/comment", Comment);

database
  .sync({ alter: true }) // when force: true, there would be all data in all tables deleted
  .then(() => {
    app.listen(process.env.PORT || 8080);
    console.log("connected to db");
  });

//
