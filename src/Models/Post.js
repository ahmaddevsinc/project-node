import { Association, DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../database";
import User from "./user";

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
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "posts",
  }
);

User.hasMany(Post);
Post.belongsTo(User);

export default Post;
