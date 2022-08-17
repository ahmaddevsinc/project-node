import jwt from "jsonwebtoken";

const createTokens = (user) => {
  const accessToken = jwt.sign(
    { name: user.name, id: user.id },
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );
  return accessToken;
};

export default createTokens;
