import {
  createPost,
  deleteAPost,
  findAllPosts,
  findDrafts,
  updateAPost,
} from "../Services/PostService.js";

export const addPost = async (req, res) => {
  try {
    const { userId, description, title, draft } = req.body;
    const newPost = await createPost(userId, description, title, draft);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const posts = await findAllPosts();
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(401).json({ message: "Posts not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, description, userId, draft } = req.body;
    const postId = req.params.id;
    const values = { title, description, draft };
    const result = updateAPost(values, userId, postId);

    if (result) {
      res.status(200).json({ message: "Post updated", post: result });
    }
    res.status(400).json({ message: "user can update his own post only " });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId;
    const result = await deleteAPost(userId, postId);
    if (result) {
      res.status(200).json({ message: "post deleted" });
    } else {
      res.status(401).json({ message: "user can delete his own post only " });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDrafts = async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await findDrafts(userId);
    if (result) {
      res.status(200).json({ message: "draft fetched", drafts: result });
    } else {
      res
        .status(404)
        .json({ message: "no drafts found for this user", drafts: result });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
