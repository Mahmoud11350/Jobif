import { Schema, Types, model } from "mongoose";

const JobSchema = new Schema(
  {
    position: {
      type: String,
      required: [true, "please provide job position"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "please provide job company"],
      trim: true,
    },
    jobLocation: {
      type: String,
      required: [true, "please provide job job location"],
      trim: true,
      default: "cairo",
    },
    jobStatus: {
      type: String,
      required: [true, "please provide job status"],
      trim: true,
      enum: {
        values: ["pending", "interview", "declined"],
        message: "job status not supported",
      },
      default: "pending",
    },
    jobType: {
      type: String,
      required: [true, "please provide job type"],
      trim: true,
      enum: {
        values: ["full-time", "part-time", "internship"],
        message: "job type not supported",
      },
      default: "remote",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Job", JobSchema);
