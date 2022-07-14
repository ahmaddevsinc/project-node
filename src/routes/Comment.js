import express from "express";
import Comment from "../models/comment";
import Post from "../models/Post";
import User from "../models/user";
import { isAuthenticated } from "../jwt";

const router = express.Router();

router.post("/addcomment", isAuthenticated, async (req, res) => {
  try {
    const userId = req.body.userId;
    const name = req.body.name;
    const text = req.body.text;
    const postId = req.body.postId;
    if (!userId || !text || !postId) {
      res.status(400).json({ message: "enter required fields" });
    }
    const newComment = await Comment.create({
      name,
      userId,
      text,
      postId,
    });
    newComment.save();
    console.log(newComment);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.get("/getcomment", async (req, res) => {
  try {
    const comment = await Comment.findAll({
      include: [
        {
          model: User,
          as: "user_comments",
          // required: false,
          attributes: ["id", "name", "email"],
        },
      ],
      order: ["createdAt"],
    });
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.get("getcomments/:id", async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const comments = await Comment.findAll({
      where: {
        postId,
      },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { text } = req.body;
    const id = parseInt(req.params.id);
    const post = post.findbypk(req.params);
    if (id === post) {
      await Comment.destroy({
        post,
        text,
      });
    }
    res.status(200).json(id);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const postId = req.body.postId;
    const text = req.body.text;
    const updateComment = await Comment.Create({
      postId,
      text,
    });
    res.status(200).json(updateComment);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

export default router;
