import jwt from "jsonwebtoken";
export const createUserToken = ({ user }) => {
  return {
    firstName: user.firstName,
    role: user.role,
    userId: user._id,
  };
};
export const createToken = ({ user }) => {
  const tokenUser = createUserToken({ user });
  const token = jwt.sign(tokenUser, process.env.JWT_SECRET);
  return token;
};

export const verifyToken = ({ token }) =>
  jwt.verify(token, process.env.JWT_SECRET);

export const attachTokenToRes = ({ res, token }) => {
  res.cookie("token", token, {
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV !== "DEVELOPMENT",
  });
};
