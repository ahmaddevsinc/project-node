import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../../database";
import Post from "./Post";
import User from "./User";

class Comment extends Model {}
Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "comments",
  }
);

User.hasMany(Comment, {
  as: "user_comments",
  foreignKey: "userId",
});
Post.hasMany(Comment, {
  as: "post_comments",
  foreignKey: "postId",
});
Comment.belongsTo(Post, {
  as: "post_comments",
  foreignKey: "postId",
});
Comment.belongsTo(User, {
  as: "user_comments",
  foreignKey: "userId",
});

// User.hasMany(Comment);
// Post.hasMany(Comment);
// Comment.belongsTo(Post);
// Comment.belongsTo(User);
export default Comment;
