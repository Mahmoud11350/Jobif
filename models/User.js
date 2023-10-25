import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "please provide your first name"],
      trim: true,
      default: "john",
    },
    lastName: {
      type: String,
      required: [true, "please provide your last name"],
      trim: true,
      default: "doe",
    },
    location: {
      type: String,
      required: [true, "please provide your location"],
      trim: true,
      default: "cairo",
    },
    email: {
      type: String,
      required: [true, "please provide your email adress"],
      unique: [true, "email already exist"],
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "please provide correct email adress",
      },
    },
    password: {
      type: String,
      required: [true, "please provide your password"],
      trim: true,
      minlength: [6, `password can't be less than 6 characters`],
    },
    avatar: {
      type: String,
    },
    publicId: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "not valid value",
      },
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  const isPasswordCorrect = await bcrypt.compare(password, this.password);
  return isPasswordCorrect;
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.pre("deleteOne", { document: true }, async function () {
  await this.model("Job").deleteMany({ createdBy: this._id });
  console.log("pre delete one ");
});
export default model("User", UserSchema);
