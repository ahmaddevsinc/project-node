import sign from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const key = "ahmad#@$@!@!1212#212e3";

const createTokens = (user) => {
  const accessToken = sign({ name: user.name, id: user.id }, key, {
    expiresIn: "24h",
  });
  return accessToken;
};

export default createTokens;


export const isAuthenticated = async (
  req,
  res,
  next
) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "authentication credetils were not provided" });
    }
    const decoded = jwt_decode(token);
    // const decoded = jwt.verify(token, key);
    // console.log("--------------DECOEDED--------------", decoded.id);
    req.body.userId = decoded.id;
    next();
  } catch (e) {
    console.log("problem is here in authenticating a user" + e);
    return res.status(500).json({ message: "Server side Error isAuth" });
  }
};