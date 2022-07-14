
import { Association, DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../database";

class User extends Model
//   implements UserAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!;
  name!;
  email!;
  password!;

  // public static associations: {
  //   roleId: Association<User, Role>;
  // };
}
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
    modelName: "Users",
  }
);
export default User;