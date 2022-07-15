import express from "express";
import Post from "../Models/Post";
import User from "../Models/User";
import { isAuthenticated } from "../jwt";

const router = express.Router();

router.post("/addpost", isAuthenticated, async (req, res) => {
  try {
    const { userId, description } = req.body;
    if (!userId || !description) {
      res.status(400).json({ message: "enter required fields" });
    }
    const newPost = await Post.create({
      userId,
      description,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.get("/getpost", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "user",
          required: false,
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt"]],
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { description } = req.body.description;
    const id = parseInt(req.params.id);
    const userId = User.findbypk(req.params.id);
    if (!userId) {
      res.status(200).json({ Error: "no posts found for this user" });
    }
    if (id === userId) {
      await Post.update({
        userId,
        description,
      });
    }
    res.status(200).json("Post updated");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = User.findbypk(req.params.id);
    const description = req.body.description;
    if (id === userId) {
      await Post.destroy({
        userId,
        description,
      });
    }
    res.status(200).json({ message: "post deleted" });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

export default router;
