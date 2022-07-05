import express from "express";
import Post from "../Models/Post";
import User from "../Models/User";
import { isAuthenticated } from "../jwt";

const router = express.Router();

router.post("/addpost", isAuthenticated, async (req, res) => {
  try {
    const { userId, description } = req.body;
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
    const id = parseInt(req.params.id);
    // const user = user.findbypk(req.params)

    // res.status(200).json(id);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.delete("/:id", async (req, res) => {
  // try {
  //     const userId = req.body.userID;
  //     const description = req.body.description;
  //     const deletePost = await Post.destroy({
  //         userId,
  //         description,
  //     })
  //     res.status(200).json(deletePost)
  // } catch (err) {
  //     res.status(400).json('Error: ' + err)
  // }
});

export default router;
