import { BADREQUEST, NOTFOUND } from "../errors/customErrors.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { attachTokenToRes, createToken } from "../utils/createJwt.js";

export const registerUser = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    throw new BADREQUEST("email already exist ");
  }
  const user = await User.create({ ...req.body, role });
  const token = createToken({ user });
  attachTokenToRes({ res, token });
  return res.status(StatusCodes.CREATED).json({ data: { user, token } });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BADREQUEST("please provide email & password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NOTFOUND("incorrect email adress");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BADREQUEST("incorrect password");
  }
  const token = createToken({ user });
  attachTokenToRes({ res, token });
  return res.status(StatusCodes.OK).json({ data: { user, token } });
};

export const logoutUser = (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now()),
  });
  return res.status(StatusCodes.OK).json({ data: "loged out successfully" });
};
