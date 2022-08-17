import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../../database.js";

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
      // unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);
export default User;
