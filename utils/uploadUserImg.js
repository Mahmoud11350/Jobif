import { v2 as cloudinary } from "cloudinary";
import { BADREQUEST } from "../errors/customErrors.js";

const uploadUserImg = async ({ req }) => {
  const filePath = req.files.avatar;
  if (!filePath.mimetype.includes("image")) {
    throw new BADREQUEST("only image can be sent to server ");
  }

  const result = await cloudinary.uploader.upload(filePath.tempFilePath, {
    folder: "jobify",
    use_filename: true,
    public_id: filePath.name,
  });
  return {
    imgSrc: result.secure_url,
    publicId: result.public_id,
  };
};

export default uploadUserImg;
