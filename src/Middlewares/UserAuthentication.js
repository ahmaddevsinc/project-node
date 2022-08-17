import jwt_decode from "jwt-decode";
import User from "../Models/User.js";

// Authentication middleware
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "user is not authenticated" });
    } else {
      const decoded = jwt_decode(token);
      const user = await User.findOne({ where: { id: decoded.id } });
      console.log("auth userdata", user.dataValues.id);
      if (user) {
        req.body.userId = user.dataValues.id;
        next();
      } else {
        res
          .status(402)
          .json({ message: "invalid user authentication credentials" });
      }
    }
  } catch (e) {
    console.log("problem is here in authenticating a user" + e);
    return res.status(500).json({ message: "Server side Error isAuth" });
  }
};
