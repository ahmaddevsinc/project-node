import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../../database.js";
import User from "./User.js";

class Post extends Model {
}
Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Post",
  }
);

User.hasMany(Post);
Post.belongsTo(User);

export default Post;
