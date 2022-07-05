import express from "express";
import database from "../database";
import users from "../routes/User";


import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", users);
// app.use("/posts", posts);
// app.use("/comment", comment);

database
  .sync({ alter: true }) // when force: true, there would be all data in all tables deleted
  .then(() => {
    app.listen(process.env.PORT || 8080);
    console.log("connected to db");
  });

//