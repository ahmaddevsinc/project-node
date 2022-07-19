import bcrypt from "bcrypt";
import express from "express";
import createTokens from "../jwt.js";
import User from "../Models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);
    User.create({
      name: name,
      email: email,
      password: hash,
    });
    // await newUser.save()
    res.status(200).json("User Created Successfully");
  } catch (err) {
    console.log(err, "-----------------");
    res.status(400).json("Error: " + err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }
    const doMatch = await bcrypt.compare(req.body.password, user.password);

    if (!doMatch) {
      res.status(400).json({ error: "Wrong usename and passowrd" });
    } else {
      const accessToken = createTokens(user);
      res.status(200).json({ status: 200, token: accessToken });
    }
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.get("/current-user", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json({ status: 200, User: user });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

export default router;