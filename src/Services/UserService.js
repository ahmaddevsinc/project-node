import bcrypt from "bcrypt";
import User from "../Models/User.js";

export const findUserByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  return user;
};

export const createUser = async (name, email, password) => {
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name,
    email: email,
    password: hash,
  });
  return user;
};
