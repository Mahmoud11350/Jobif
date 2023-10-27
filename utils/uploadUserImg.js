import { v2 as cloudinary } from "cloudinary";
import { BADREQUEST } from "../errors/customErrors.js";

const uploadUserImg = async ({ req }) => {
  let filePath;
  if (req.files && req.files.avatar) {
    filePath = req.files.avatar;
  } else {
    return;
  }

  if (filePath && !filePath.mimetype.includes("image")) {
    throw new BADREQUEST("only image can be sent to server ");
  }

  try {
    const result = await cloudinary.uploader.upload(filePath.tempFilePath, {
      folder: "jobify",
      use_filename: true,
      public_id: filePath.name,
    });
    return {
      imgSrc: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    return error;
  }
};

export default uploadUserImg;
