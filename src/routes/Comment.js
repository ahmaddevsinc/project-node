import express from "express";
import Comment from "../Models/Comment.js";
import Post from "../Models/Post.js";
import User from "../Models/Comment.js";
import { isAuthenticated } from "../jwt.js";

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
        postId: postId,
      },
    });
    if (!comments) {
      res.status(400).json({ err: "no comments found" });
    }
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { text } = req.body;
    const id = parseInt(req.params.id);
    const post = Post.findbypk(req.params);
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
    const comment = await Comment.findOne({ where: { postId: postId } });
    if (!comment) {
      res.status(400).json({ err: "no comments found" });
    }
    const updateComment = await Comment.update({
      postId: postId,
      text: text,
    });
    res.status(200).json(updateComment);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

export default router;
