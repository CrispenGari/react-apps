import jsonwebtoken from "jsonwebtoken";

const { JWT_SECRETE } = process.env;
export const signJwt = async (user) => {
  const jwt = await jsonwebtoken.sign(
    { email: user.email, _id: user._id },
    JWT_SECRETE,
    { expiresIn: "7d" }
  );
  return jwt;
};

export const verifyJwt = async (jwt) => {
  const user = await jsonwebtoken.verify(jwt, JWT_SECRETE);
  return user;
};
