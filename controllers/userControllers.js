import { StatusCodes } from "http-status-codes";
import { BADREQUEST, NOTFOUND } from "../errors/customErrors.js";
import User from "../models/User.js";
import { checkPermission } from "../utils/checkPermessions.js";
import uploadUserImg from "../utils/uploadUserImg.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  checkPermission({ req });
  res.status(StatusCodes.OK).json({
    data: { users },
  });
};

export const userProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new NOTFOUND(`can't find user with id ${id}`);
  }
  checkPermission({ req, id });
  res.status(StatusCodes.OK).json({
    data: { user },
  });
};

export const currentUser = async (req, res) => {
  const currentUser = req.user;
  if (!currentUser) {
    throw new BADREQUEST("please login first");
  }
  const user = await User.findOne({ _id: currentUser.userId });
  res.status(StatusCodes.OK).json({
    data: { user },
  });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new NOTFOUND(`can't find user with id ${id}`);
  }
  checkPermission({ req, id });
  let updateQuery = { ...req.body };
  if (req.files && req.files.avatar) {
    const { imgSrc, publicId } = await uploadUserImg({ req });
    updateQuery = { ...req.body, avatar: imgSrc, publicId };
  }

  const user = await User.findByIdAndUpdate(id, updateQuery, {
    runValidators: true,
    new: true,
  });
  if (req.files && user.publicId) {
    await cloudinary.uploader.destroy(isUserExist.publicId);
  }
  res.status(StatusCodes.OK).json({
    data: { user },
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new NOTFOUND(`can't find user with id ${id}`);
  }
  checkPermission({ req, id });
  await user.deleteOne();
  res.status(StatusCodes.OK).json({
    data: { user },
  });
};
