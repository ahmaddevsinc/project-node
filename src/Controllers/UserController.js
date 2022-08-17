import bcrypt from "bcrypt";
import createTokens from "../jwt.js";
import { createUser, findUserByEmail } from "../Services/UserService.js";

export const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      const user = await createUser(name, email, password);
      if (user) {
        res.status(200).json({ message: "User Created Successfully" });
      }
    } else {
      res.status(401).json({ message: "this email is already registered" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const signInUser = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }
    const doMatch = await bcrypt.compare(req.body.password, user.password);

    if (!doMatch) {
      res.status(401).json({ error: "Wrong passowrd" });
    } else {
      debugger;
      const accessToken = createTokens(user);

      res
        .status(200)
        .json({ status: 200, token: accessToken, userId: user.id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
