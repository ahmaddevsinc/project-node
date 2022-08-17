import {
  createComment,
  deleteAComment,
  findAllComments,
  findAllCommentsByPostId,
  updateAComment,
} from "../Services/CommentService.js";

export const addComment = async (req, res) => {
  try {
    const { userId, text, postId } = req.body;
    const newComment = await createComment(userId, text, postId);
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getComment = async (req, res) => {
  try {
    const comment = await findAllComments();
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getCommentByPostId = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await findAllCommentsByPostId(postId);
    if (!comments) {
      res.status(400).json({ err: "no comments found for this post" });
    } else {
      res.status(200).json(comments);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { text, userId } = req.body;
    const commentId = req.params.id;
    const values = { text };
    const result = await updateAComment(text, userId, commentId);
    if (result) {
      res.status(200).json({ message: "comment updated successfully" });
    } else {
      res
        .status(401)
        .json({ message: "user can updated his own comment only " });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.body.userId;
    const result = await deleteAComment(userId, commentId);
    if (result) {
      res.status(200).json({ message: "comment deleted" });
    } else {
      res
        .status(400)
        .json({ message: "user can delete his own comment only " });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
