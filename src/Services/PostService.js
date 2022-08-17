import Post from "../Models/Post.js";
import User from "../Models/User.js";

export const createPost = async (userId, description, title, draft) => {
  const post = await Post.create({
    userId,
    description,
    title,
    draft,
  });
  return post;
};

export const findAllPosts = async () => {
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
  return posts;
};

export const updateAPost = async (values, userId, postId) => {
  const updatedPost = await Post.update(values, {
    where: {
      userId: userId,
      id: postId,
    },
  });
  return updatedPost;
};

export const deleteAPost = async (userId, postId) => {
  const deletedPost = await Post.destroy({
    where: {
      userId: userId,
      id: postId,
    },
  });
  return deletedPost;
};


export const findDrafts = async (userId) => {
  const posts = await Post.findAll({
    where: {
      userId: userId,
      draft: true,
    },
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
  return posts;
};