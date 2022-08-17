import Comment from "../Models/Comment.js";
import User from "../Models/User.js";

export const createComment = async (userId, text, postId) => {
  const comment = await Comment.create({
    userId,
    text,
    postId,
  });
  return comment;
};

export const findAllComments = async () => {
  const comments = await Comment.findAll({
    include: [
      {
        model: User,
        as: "user_comments",
      },
    ],
    order: ["createdAt"],
  });
  return comments;
};

export const findAllCommentsByPostId = async (postId) => {
  const comments = await Comment.findAll({
    where: {
      postId: postId,
    },
    include: [
      {
        model: User,
        as: "user_comments",
      },
    ],
    order: ["createdAt"],
  });
  return comments;
};

export const updateAComment = async (text, userId, commentId) => {
  const updatedComment = await Comment.update(
    { text: text },
    {
      where: {
        userId: userId,
        id: commentId,
      },
    }
  );
  return updatedComment;
};

export const deleteAComment = async (userId, commentId) => {
  const deletedComment = await Comment.destroy({
    where: {
      id: commentId,
      userId: userId,
    },
  });
  return deletedComment;
};
